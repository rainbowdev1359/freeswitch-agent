from django.db import models
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import logging
from django.utils import timezone
import os
from google.cloud import speech_v1p1beta1 as speech
from pydub import AudioSegment
from moviepy.editor import VideoFileClip
import textract

logger = logging.getLogger(__name__)


def extract_text_from_document(file_path):
    try:
        text = textract.process(file_path).decode('utf-8')
        return text
    except Exception as e:
        return f"An error occurred: {e}"

def extract_audio_from_video(video_path):
    video = VideoFileClip(video_path)
    audio_path = "extracted_audio.wav"
    video.audio.write_audiofile(audio_path, codec='pcm_s16le')
    return audio_path

def convert_audio_to_wav(file_path):
    audio = AudioSegment.from_file(file_path)
    wav_file_path = "converted_audio.wav"
    audio.export(wav_file_path, format="wav")
    return wav_file_path

def transcribe_audio_with_google(file_path, google_credentials_path):
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = google_credentials_path
    client = speech.SpeechClient()

    if not file_path.endswith('.wav'):
        file_path = convert_audio_to_wav(file_path)

    with open(file_path, 'rb') as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code='en-US'
    )

    response = client.recognize(config=config, audio=audio)
    transcription = ' '.join([result.alternatives[0].transcript for result in response.results])
    return transcription


class Knowledge(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='knowledge')
    file_path = models.CharField(max_length=255)
    file_name = models.CharField(max_length=255)
    Date = models.DateTimeField(default=timezone.now)  # Use timezone-aware datetime
    raw = models.TextField()
    file = models.FileField(upload_to='knowledge_uploads/', null=True, blank=True, storage=FileSystemStorage(location=settings.MEDIA_ROOT))

    def save(self, *args, **kwargs):
        try:
            if self.file:
                self.file_name = self.file.name
                self.file_path = settings.MEDIA_URL + 'knowledge_uploads/' + self.file.name
                # if (self.raw == "audio"):
                    # self.raw = transcribe_audio_with_google(self.file_path, google_credentials_path)
                # if (self.raw == "video"):
                    # self.raw = transcribe_audio_with_google(extract_audio_from_video(self.file_path), google_credentials_path)
                # if (self.raw == "document"):
                    # self.raw = extract_text_from_document(self.file_path)
            super(Knowledge, self).save(*args, **kwargs)
            logger.info(f"Knowledge object {self.id} saved successfully.")
        except Exception as e:
            logger.error(f"Error saving Knowledge object: {e}", exc_info=True)
            raise