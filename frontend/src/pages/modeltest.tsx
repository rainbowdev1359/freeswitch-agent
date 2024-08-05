import { Col, Form, Button, Spinner } from "react-bootstrap";
import CompanyTable from "../component/company/companyTable";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { H1Styled, DivStyled, PageContainer } from "../component/StyleComponents";
import { useState } from "react";
import styled from 'styled-components'; // Make sure you have styled-components installed

const MessageContainer = styled.div<{ isAgent: boolean }>`
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  max-width: 70%;
  align-self: ${({ isAgent }) => (isAgent ? 'flex-end' : 'flex-start')};
  background-color: ${({ isAgent }) => (isAgent ? '#e0f7fa' : '#ffe0b2')};
  display: flex;
  justify-content: flex-start;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: ${({ isAgent }) => (isAgent ? 'auto' : '10px')};
    right: ${({ isAgent }) => (isAgent ? '10px' : 'auto')};
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ isAgent }) => (isAgent ? '#00796b' : '#ff9800')};
  }
`;

interface ModelTestProps {
  isSidebarOpened: boolean;
}

const ModelTest: React.FC<ModelTestProps> = ({ isSidebarOpened }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = localStorage.getItem('username');

  // State for chat messages and input
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    // Add user's message to the chat
    setMessages((prev) => [...prev, { sender: 'Customer', text: input }]);
    setIsLoading(true);

    // Send the message to the FastAPI backend
    try {
      const response = await fetch('http://75.101.228.188:8001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let result = '';

      while (!done) {
        const { done: doneReading, value } = await reader!.read();
        done = doneReading;
        result += decoder.decode(value, { stream: true });
      }

      // Update the chat with the bot's response
      setMessages((prev) => [...prev, { sender: 'Agent', text: result.trim() }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setInput(''); // Clear the input field
    }
  };

  return (
    <Col>
      <PageContainer>
        {/* <H1Styled>{user ? `Welcome, ${user}` : 'Welcome'}</H1Styled> */}
        <DivStyled>
          {/* Add your CompanyTable and other components here */}
          {/* <CompanyTable /> */}
          {/* Chat Interface */}
          <div style={{ padding: '10px', paddingLeft: '100px', paddingRight: '150px', height: '90vh', overflowY: 'scroll', marginTop: '20px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ padding: '10px', paddingLeft: '100px', paddingRight: '150px', height: '80vh', overflowY: 'scroll', marginTop: '20px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {messages.map((msg, index) => (
                <MessageContainer key={index} isAgent={msg.sender === 'Agent'}>
                  {msg.sender}: {msg.text}
                </MessageContainer>
              ))}
              {isLoading && (
                <div className="text-white">
                  <Spinner animation="border" size="sm" /> Loading...
                </div>
              )}
            </div>
          </div>
          <Form
            onSubmit={handleSendMessage}
            className="d-flex"
            style={{
              position: 'relative',
              bottom: '10px', // Adjust as needed
              left: '10px',   // Adjust as needed
              right: '10px',  // Adjust as needed
              marginTop: '10px',
              marginRight: '150px',
              marginLeft: '80px',
              zIndex: 1000    // Ensure it stays above other content
            }}
          >
            <Form.Group controlId="chatInput" className="me-2 flex-grow-1">
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                style={{ backgroundColor: '#27798b', color: 'white' }}
                className="custom-placeholder"
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: '#27798b', borderColor: '#27798b', color: 'white' }}
              type="submit">
              Send
            </Button>
          </Form>
        </DivStyled>
      </PageContainer>
    </Col>
  );
}

export default ModelTest;