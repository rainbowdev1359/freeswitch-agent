from fastapi import APIRouter, HTTPException, FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse, FileResponse
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains.conversational_retrieval.base import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory, ConversationSummaryBufferMemory
from langchain_openai import OpenAIEmbeddings
from langchain.callbacks import StreamingStdOutCallbackHandler
from langchain_pinecone import PineconeVectorStore
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains.llm import LLMChain
from langchain.chains.conversation.base import ConversationChain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableBranch
from langchain_core.messages import AIMessage, HumanMessage
from langchain_community.chat_message_histories import ChatMessageHistory
from pinecone import Pinecone
from pathlib import Path
import os
import random
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

router = APIRouter()

MEDIA_DIR = Path(os.getenv('MEDIA_DIR', '/home/ubuntu/epic-rag-langchain/app/media'))

# Initialize history globally
history = ""
current_respond = ""

@app.get("/")
async def get_chat_page():
    return FileResponse("static/index.html")

# Define the Pydantic model for incoming chat requests
class ChatRequest(BaseModel):
    message: str

@router.post("/")
async def chat(request: ChatRequest):
    global history  # Use global history for conversation tracking
    global current_respond

    message = request.message

    # Initialize the chat model and vector store
    chat = ChatOpenAI(
        openai_api_key=os.getenv('OPENAI_API_KEY'),
        model=os.getenv('OPENAI_MODEL_NAME'),
        streaming=True,
        callbacks=[StreamingStdOutCallbackHandler()],
    )

    pc = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))
    embeddings = OpenAIEmbeddings(openai_api_key=os.getenv('OPENAI_API_KEY'))
    vectorstore = PineconeVectorStore(
        pinecone_api_key=os.getenv('PINECONE_API_KEY'),
        index_name=os.getenv('PINECONE_INDEX'),
        embedding=embeddings,
    )
    retriever = vectorstore.as_retriever()

    async def event_stream():
        global history  # Modify global history variable
        global current_respond
        response_message = current_respond
        # Handle the logic for the initial question
        if "what is your name" in response_message.lower():
            if message:  # If the user provided their name
                extraction_prompt = f"Extract the first name from the following sentence: '{message}'. Please respond with only the first name."
                
                # Get the first name from OpenAI
                user_name = chat.invoke(extraction_prompt)  # Use OpenAI to extract the first name
                
                # Clean up the response to get the first name
                user_name = user_name.content

                response_message = f"""Hello {user_name}, Welcome to the AI sales Coach. I am here to help you improve your sales conversations. You can say or press your inputs at any point on this call.
                I look forward to helping you improve your sales conversations. Let us get started.
                Here are the Coaching Options I can help you with:
                1. Sales Objection Role-Play
                2. Knowledge & Skills Test
                3. Conversation Role-Play
                Which one would you like help with?"""
                
                current_respond = f"Agent: {user_name}\nCustomer: {response_message}\n"
                history += f"Agent: {user_name}\nCustomer: {response_message}\n"  # Update history
            else:
                response_message = "Please again. What is your name?"
                current_respond = "Customer: What is your name?\n"
                history += "Customer: What is your name?\n"  # Update history
        elif "sales objection role play" in response_message.lower():
            if message:
                response_message = """
                    Which Product would you like to role-play with, your options are:
                    1.General Sales
                    2. Endurant
                    3. SAC regression
                    4. Hostile neck solutions
                    5. GORE EXCLUDER
                    6. Cook Zenith Fenestrated
                    7. Valiant Captivia Brand
                    8. Valiant Captivia for type B dissections
                    9. Conformable Thoracic Stent Graft with Active Control
                    10. Gore TAG TBE
                    11. Cook Zenith Alpha
                    12. Cook Zenith TX2
                    """
                
                current_respond = f"Customer: {response_message}\n"
                history += f"Customer: {response_message}\n"
            else:
                response_message = "Please again. Which one would you like helop with?"
                current_respond = "Customer: Which one would you like help with?\n"
                history += "Customer: Which one would you like help with?\n"  # Update history
        elif "bye" in response_message.lower():
            response_message = "Thank you for your conversation. Bye."
            current_respond = "Customer: Thank you for your conversation. Bye.\n"
            history += "Customer: Thank you for your conversation. Bye.\n"  # Update history

        # Define the conversation templates

        random_vector = [random.uniform(-1.0, 1.0) for _ in range(1536)]
        all_results = vectorstore._index.query(
            vector=random_vector,
            top_k=1,
            include_metadata=True,
        )

        bot_hello_responses = [item['metadata']['bot_hello'] for item in all_results['matches'] if 'bot_hello' in item['metadata']]
        human_listen_responses = [item['metadata']['human_listen'] for item in all_results['matches'] if 'human_listen' in item['metadata']]
        human_clarify_responses = [item['metadata']['human_clarify'] for item in all_results['matches'] if 'human_clarify' in item['metadata']]
        human_check_responses = [item['metadata']['human_check'] for item in all_results['matches'] if 'human_check' in item['metadata']]

        bot_hello_responses_str = "\n".join(bot_hello_responses)
        human_listen_responses_str = "\n".join(human_listen_responses)
        human_clarify_responses_str = "\n".join(human_clarify_responses)
        human_check_responses_str = "\n".join(human_check_responses)
        

        SYSTEM_TEMPLATE = """ 
            First it asks your name.
            
            Wait while the prospect responds.

            When the potential customer responds, we proceed with the conversation with the following content:

            I want you to take the role of a sales coach for a medical company selling to help me improve my ability to respond to sales objections.

            The Objection I want to work on is: 

            Objection: Too expensive

            Here is the suggested response from the company: 

            Suggested Response Framework, using the Listen, Clarify, Respond, Check conversation Structure: 

            I understand that cost is a significant concern for you. 	Can you share more about your current budget constraints?	

            Our product may seem expensive upfront, but it often leads to long-term savings through increased efficiency and reduced complications. What are your thoughts about the longer-term savings? Does this address your concern about the cost?

            Can you help me role-play this conversation? 

            Once we complete this role play I will have you provide me with feedback on how I can improve my ability to respond to this objection based on my response and the suggested response framework. I want you to analyze my response to the objection and provide one thing I can do to improve. 

            please only output customer's response.
            
            <context>
            {context}
            </context>
        """

        question_answering_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", SYSTEM_TEMPLATE),
                MessagesPlaceholder(variable_name="messages"),
            ]
        )

        # Create the document chain for processing responses
        document_chain = create_stuff_documents_chain(chat, question_answering_prompt)
        query_transform_prompt = ChatPromptTemplate.from_messages(
            [
                MessagesPlaceholder(variable_name="messages"),
                (
                    "user",
                    "Given the above conversation, generate a search query to look up in order to get information relevant "
                    "to the conversation. Only respond with the query, nothing else.",
                ),
            ]
        )

        query_transforming_retriever_chain = RunnableBranch(
            (
                lambda x: len(x.get("messages", [])) == 1,
                (lambda x: x["messages"][-1].content) | retriever,
            ),
            query_transform_prompt | chat | StrOutputParser() | retriever,
        ).with_config(run_name="chat_retriever_chain")

        conversational_retrieval_chain = RunnablePassthrough.assign(
            context=query_transforming_retriever_chain,
        ).assign(
            answer=document_chain,
        )

        # Stream the response back to the client
        for chunk in conversational_retrieval_chain.stream(
            {
                "messages": [
                    HumanMessage(content=response_message),
                ],
            }
        ):
            if 'answer' in chunk:
                current_respond = current_respond + chunk["answer"]
                history = history + chunk["answer"]
                yield f'{chunk["answer"]}\n\n'

    return StreamingResponse(event_stream(), media_type="text/event-stream")  # Return as a streaming response
