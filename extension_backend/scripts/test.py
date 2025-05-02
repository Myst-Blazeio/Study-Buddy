#!/usr/bin/env python3

import sys
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import TextFormatter
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound, VideoUnavailable
import pycountry

def get_language_name(lang_code):
    try:
        return pycountry.languages.get(alpha_2=lang_code).name
    except:
        return lang_code  # fallback

def fetch_and_display_transcript(video_id: str):
    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)

        # Iterate over available transcripts
        for transcript in transcript_list:
            lang_code = transcript.language_code
            lang_name = get_language_name(lang_code)

            try:
                fetched = transcript.fetch()
                formatter = TextFormatter()
                formatted_transcript = formatter.format_transcript(fetched)

                print(f"--- Transcript Language: {lang_name} ({lang_code}) ---\n")
                print(formatted_transcript)
                return
            except Exception as e:
                continue

        print("❌ No usable transcript found in any language.")

    except NoTranscriptFound:
        print("❌ No transcripts found for this video.")
    except TranscriptsDisabled:
        print("❌ Transcripts are disabled for this video.")
    except VideoUnavailable:
        print("❌ The video is unavailable.")
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python transcript_text.py <YouTubeVideoID>")
        sys.exit(1)

    video_id = sys.argv[1]
    fetch_and_display_transcript(video_id)
