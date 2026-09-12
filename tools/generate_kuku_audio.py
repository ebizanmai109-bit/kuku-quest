import os
import json
import requests

BASE_URL = "http://127.0.0.1:10101"
SPEAKER_ID = 0 

AUDIO_DIR = os.path.join(os.path.dirname(__file__), "..", "audio")
DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "kuku.json")

os.makedirs(AUDIO_DIR, exist_ok=True)

def main():
    if not os.path.exists(DATA_PATH):
        print(f"エラー: 読み方データが見つかりません ({DATA_PATH})")
        return

    with open(DATA_PATH, "r", encoding="utf-8") as f:
        kuku_data = json.load(f)

    print("AivisSpeechからの音声生成を開始します...")

    for key, text in kuku_data.items():
        wav_path = os.path.join(AUDIO_DIR, f"{key}.wav")
        
        if os.path.exists(wav_path):
            print(f"[スキップ] {key}.wav はすでに存在します。")
            continue

        print(f"[生成中] {key} : 「{text}」")
        try:
            query_res = requests.post(
                f"{BASE_URL}/audio_query",
                params={"text": text, "speaker": SPEAKER_ID}
            )
            if query_res.status_code != 200:
                print(f"  -> 失敗: audio_query エラー (Status: {query_res.status_code})")
                continue
            
            query_data = query_res.json()

            synth_res = requests.post(
                f"{BASE_URL}/synthesis",
                params={"speaker": SPEAKER_ID},
                json=query_data
            )
            if synth_res.status_code != 200:
                print(f"  -> 失敗: synthesis エラー (Status: {synth_res.status_code})")
                continue

            with open(wav_path, "wb") as wav_file:
                wav_file.write(synth_res.content)
            print(f"  -> 成功: {key}.wav を保存しました。")

        except Exception as e:
            print(f"  -> エラー発生 ({key}): {e}")

    print("すべての処理が完了しました！")

if __name__ == "__main__":
    main()