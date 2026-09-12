let currentStage = 2;
let questions = [];
let currentIndex = 0;
let meaningStep = 0;
let currentAudioKey = "";

// 九の読み方マップ（判定用）
const kukuAnswersMap = {
    "1-1": "いんいちがいち", "1-2": "いんにがに", "1-3": "いんさんがさん", "1-4": "いんしがし", "1-5": "いんごがご", "1-6": "いんろくがろく", "1-7": "いんしちがしち", "1-8": "いんはちがはち", "1-9": "いんくがく",
    "2-1": "にいちがに", "2-2": "ににんがし", "2-3": "にさんがろく", "2-4": "にしがはち", "2-5": "にごじゅう", "2-6": "にろくじゅうに", "2-7": "にしちじゅうし", "2-8": "にはちじゅうろく", "2-9": "にくじゅうはち",
    "3-1": "さんいちがさん", "3-2": "さんにがろく", "3-3": "さざんがく", "3-4": "さんしじゅうに", "3-5": "さんごじゅうご", "3-6": "さんろくじゅうはち", "3-7": "さんしちにじゅういち", "3-8": "さんぱにじゅうし", "3-9": "さんくにじゅうしち",
    "4-1": "しいちがし", "4-2": "しにがはち", "4-3": "しさんじゅうに", "4-4": "ししじゅうろく", "4-5": "しごにじゅう", "4-6": "しろくにじゅうし", "4-7": "ししちにじゅうはち", "4-8": "しはちさんじゅうに", "4-9": "しくさんじゅうろく",
    "5-1": "ごいちがご", "5-2": "ごにがじゅう", "5-3": "ごさんじゅうご", "5-4": "ごしにじゅう", "5-5": "ごごにじゅうご", "5-6": "ごろくさんじゅう", "5-7": "ごしちさんじゅうご", "5-8": "ごはちはじゅう", "5-9": "ごくしじゅうご",
    "6-1": "ろくいちがろく", "6-2": "ろくにがじゅうに", "6-3": "ろくさんじゅうはち", "6-4": "ろくしにじゅうし", "6-5": "ろくごさんじゅう", "6-6": "ろくろくさんじゅうろく", "6-7": "ろくしちしじゅうに", "6-8": "ろくはちしじゅうはち", "6-9": "ろっくごじゅうし",
    "7-1": "しちいちがしち", "7-2": "しちにがじゅうし", "7-3": "しちさんにじゅういち", "7-4": "しちしにじゅうはち", "7-5": "しちごさんじゅうご", "7-6": "しちろくしじゅうに", "7-7": "しちしちしじゅうく", "7-8": "しちはちごじゅうろく", "7-9": "しちくろくじゅうさん",
    "8-1": "はちいちがはち", "8-2": "はちにがじゅうろく", "8-3": "はちさんにじゅうし", "8-4": "はしさんじゅうに", "8-5": "はちごしじゅう", "8-6": "はちろくしじゅうはち", "8-7": "はちしちごじゅうろく", "8-8": "はっぱろくじゅうし", "8-9": "はっくしちじゅうに",
    "9-1": "くいちがく", "9-2": "くにがじゅうはち", "9-3": "くさんにじゅうしち", "9-4": "くしさんじゅうろく", "9-5": "くごしじゅうご", "9-6": "くろくごじゅうし", "9-7": "くしちろくじゅうさん", "9-8": "くはちしちじゅうに", "9-9": "くくはちじゅういち"
};

// 音声を再生する関数（audio/X-Y.wav を再生）
function playAudio(key) {
    const audio = new Audio(`audio/${key}.wav`);
    audio.play().catch(error => {
        console.log("音声の自動再生がブロックされたか、ファイルが見つかりません:", error);
    });
}

function playCurrentAudio() {
    if (currentAudioKey) {
        playAudio(currentAudioKey);
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.container > div').forEach(div => div.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

function goHome() {
    showScreen('screen-home');
}

function startMeaningScreen() {
    showScreen('screen-meaning');
    meaningStep = 0;
}

function nextMeaningStep() {
    meaningStep++;
    if (meaningStep === 1) {
        document.getElementById('meaning-text').innerHTML = "「3つの お皿」に「4個ずつ」みかんが乗っています。<br>みかんのぜんぶの数はいくつかな？";
        document.getElementById('meaning-visual').innerHTML = "🍊🍊🍊 🍊🍊🍊 🍊🍊🍊";
    } else if (meaningStep === 2) {
        document.getElementById('meaning-text').innerHTML = "なるほど！かけ算は<br>「同じ数がいくつ分あるか」を表すんだね！";
        document.getElementById('meaning-visual').innerHTML = "🌟 🚀 🌟";
    } else {
        startStageSelect();
    }
}

function startStageSelect() {
    showScreen('screen-stages');
}

function startStage(stageNum) {
    currentStage = stageNum;
    showScreen('screen-game');
    
    questions = [];
    for (let i = 1; i <= 9; i++) {
        questions.push({ a: currentStage, b: i, ans: currentStage * i });
    }
    questions.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    if (currentIndex >= 5) { // 1ステージ5問
        showScreen('screen-clear');
        document.getElementById('clear-message').innerText = `${currentStage}の段をクリアしました！`;
        return;
    }

    const q = questions[currentIndex];
    document.getElementById('score-board').innerText = `もんだい ${currentIndex + 1} / 5`;
    document.getElementById('problem-display').innerText = `${q.a} × ${q.b} = ?`;
    document.getElementById('hint-text').innerText = "";

    currentAudioKey = `${q.a}-${q.b}`;
    playAudio(currentAudioKey);

    // 選択肢の作成
    let choices = [q.ans];
    while (choices.length < 4) {
        let dummy = (Math.floor(Math.random() * 9) + 1) * (Math.floor(Math.random() * 9) + 1);
        if (!choices.includes(dummy)) {
            choices.push(dummy);
        }
    }
    choices.sort(() => Math.random() - 0.5);

    const container = document.getElementById('choices-container');
    container.innerHTML = "";
    choices.forEach(num => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = num;
        btn.onclick = () => checkAnswer(num, q.ans);
        container.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        document.getElementById('hint-text').innerHTML = `<span style="color:#27ae60;">正解です！よくできました！</span>`;
        setTimeout(() => {
            currentIndex++;
            loadQuestion();
        }, 1000);
    } else {
        document.getElementById('hint-text').innerHTML = `<span style="color:#c0392b;">おしいです。もう一度押してみましょう。</span>`;
    }
}

// --- 音声認識（マイク入力）の処理 ---
let recognition = null;

if ('webkitSpeechRecognition' in window || 'speechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    recognition.onstart = function() {
        document.getElementById('recognition-status').innerText = "🎙️ きいています...（九九を唱えてね）";
        document.getElementById('mic-btn').style.backgroundColor = "#c0392b";
    };

    recognition.onresult = function(event) {
        let saidText = event.results[0][0].transcript;
        saidText = saidText.replace(/[\s、。]/g, '');
        
        document.getElementById('recognition-status').innerText = `ききとり: 「${saidText}」`;
        checkVoiceAnswer(saidText);
    };

    recognition.onerror = function(event) {
        document.getElementById('recognition-status').innerText = "⚠️ うまく聞き取れませんでした。もう一度ボタンを押してね。";
        document.getElementById('mic-btn').style.backgroundColor = "#e74c3c";
    };

    recognition.onend = function() {
        document.getElementById('mic-btn').style.backgroundColor = "#e74c3c";
    };
} else {
    console.warn("このブラウザは音声認識をサポートしていません。");
}

function startVoiceInput() {
    if (!recognition) {
        alert("お使いのブラウザは音声認識に対応していません。Google Chromeなどでお試しください。");
        return;
    }
    try {
        recognition.start();
    } catch (e) {
        console.log("すでに音声認識が起動しています", e);
    }
}

function checkVoiceAnswer(saidText) {
    const q = questions[currentIndex];
    const key = `${q.a}-${q.b}`;
    const expectedReading = kukuAnswersMap[key] || "";
    
    let isCorrect = false;
    if (saidText.includes(expectedReading) || saidText.includes(q.ans.toString())) {
        isCorrect = true;
    }

    if (isCorrect) {
        document.getElementById('hint-text').innerHTML = `<span style="color:#27ae60;">🎉 すごい！「${saidText}」正解です！</span>`;
        playAudio(key);
        setTimeout(() => {
            currentIndex++;
            loadQuestion();
        }, 1500);
    } else {
        document.getElementById('hint-text').innerHTML = `<span style="color:#c0392b;">「${saidText}」かな？おしい！もう一度マイクで言ってみてね。</span>`;
    }
}