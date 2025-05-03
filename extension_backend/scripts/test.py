import json
from youtube_transcript_api import YouTubeTranscriptApi

# Replace with your video ID
video_id = "Uk2p373Ac1U"

try:
    # Get available transcripts for the video
    transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
    
    # Initialize a list to store all transcripts
    all_transcripts = []

    # Iterate through all available transcripts
    for transcript_metadata in transcript_list:
        language = transcript_metadata.language
        language_code = transcript_metadata.language_code
        
        # Fetch the transcript
        transcript = transcript_metadata.fetch()
        
        # Convert the transcript to a JSON-serializable format
        transcript_serializable = [{"text": snippet.text, "start": snippet.start, "duration": snippet.duration} for snippet in transcript]
        
        # Add the transcript and its metadata to the list
        all_transcripts.append({
            "language": language,
            "language_code": language_code,
            "transcript": transcript_serializable
        })
    
    # Save all transcripts to a JSON file
    output = {
        "video_id": video_id,
        "transcripts": all_transcripts
    }
    
    with open("all_transcripts.json", "w", encoding="utf-8") as json_file:
        json.dump(output, json_file, ensure_ascii=False, indent=4)
    
    print("All transcripts saved to all_transcripts.json.")
except Exception as e:
    print(f"An error occurred: {e}")