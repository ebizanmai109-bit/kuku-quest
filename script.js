// ==========================================
// 九九データ（81問の定義と読み方マッピング）
// ==========================================
const kukuData = [];
const readMap = {
    "1_1": "いちは いち", "1_2": "いちに に", "1_3": "いちさん さん", "1_4": "いちし し", "1_5": "いちご ご", "1_6": "いちろく ろく", "1_7": "いちしち しち", "1_8": "いちには は", "1_9": "いちく く",
    "2_1": "にいち に", "2_2": "ににんが し", "2_3": "にさん ろく", "2_4": "にし は", "2_5": "にご じゅう", "2_6": "にろく じゅうに", "2_7": "にしち じゅうし", "2_8": "には じゅうろく", "2_9": "にく じゅうはち",
    "3_1": "さんいち さん", "3_2": "さんにと ろく", "3_3": "さんさん がく", "3_4": "さんし じゅうに", "3_5": "さんご じゅうご", "3_6": "さんろく じゅうはち", "3_7": "さんしち にじゅういち", "3_8": "さんは にじゅうし", "3_9": "さんく にじゅうしち",
    "4_1": "しいち し", "4_2": "しに は", "4_3": "さんしじゃないよ_3x4", "4_4": "しし じゅうろく", "4_5": "しご にじゅう", "4_6": "しろく にじゅうし", "4_7": "ししち にじゅうはち", "4_8": "しは さんじゅうに", "4_9": "しく さんじゅうろく",
    "5_1": "ごいち ご", "5_2": "ごに じゅう", "5_3": "ごさん じゅうご", "5_4": "ごし じゅう", "5_5": "ごご にじゅうご", "5_6": "ごろく さんじゅう", "5_7": "ごしち さんじゅうご", "5_8": "ごは しじゅう", "5_9": "ごく しじゅうご",
    "6_1": "ろくいち ろく", "6_2": "ろくに じゅうに", "6_3": "ろくさん じゅうはち", "6_4": "ろくし にじゅうし", "6_5": "ろくご さんじゅう", "6_6": "ろくろく さんじゅうろく", "6_7": "ろくしち しじゅうに", "6_8": "ろくは しじゅうはち", "6_9": "ろくく ごじゅうし",
    "7_1": "しちいち しち", "7_2": "しちに じゅうし", "7_3": "しちさん にじゅういち", "7_4": "しちし にじゅうはち", "7_5": "しちご さんじゅうご", "7_6": "しちろく しじゅうに", "7_7": "しちしち しじゅうく", "7_8": "しちは ごじゅうろく", "7_9": "しちく ろくじゅうさん",
    "8_1": "はちいち は", "8_2": "はちに じゅうろく", "8_3": "はちさん にじゅうし", "8_4": "はちし さんじゅうに", "8_5": "はちご しじゅう", "8_6": "はちろく しじゅうはち", "8_7": "はちしち ごじゅうろく", "8_8": "はちのはち ろくじゅうし", "8_9": "はちく しちじゅうに",
    "9_1": "くいち く", "9_2": "くに じゅうはち", "9_3": "くさん にじゅうしち", "9_4": "くし さんじゅうろく", "9_5": "くご しじゅうご", "9_6": "くろく ごじゅうし", "9_7": "くしち ろくじゅうさん", "9_8": "くは しちじゅうに", "9_9": "くく はちじゅういち"
};

// 正確な日本の小学校読みリスト（正規化用）
const standardReadings = {
    "1_1": ["いちはいち", "いちいち"],
    "1_2": ["いちにに", "いちはに"],
    "1_3": ["いちさんさん"],
    "1_4": ["いちしし", "いちし"],
    "1_5": ["いちごご", "いちご"],
    "1_6": ["いちろくろく", "いちろく"],
    "1_7": ["いちしちしち", "いちしち"],
    "1_8": ["いちちはは", "いちはは"],
    "1_9": ["いちくく", "いちく"],
    
    "2_1": ["にいちに"],
    "2_2": ["ににんがし", "ににし"],
    "2_3": ["にさんろく"],
    "2_4": ["にしは"],
    "2_5": ["にごじゅう"],
    "2_6": ["にろくじゅうに"],
    "2_7": ["にしちじゅうし", "にしちじゅういち", "にしちにじゅうし"],
    "2_8": ["にはじゅうろく"],
    "2_9": ["にくじゅうはち"],

    "3_1": ["さんいちさん"],
    "3_2": ["さんにとろく", "さんにはろく", "さんにろく"],
    "3_3": ["さんさんがく", "さんさんく"],
    "3_4": ["さんしじゅうに"],
    "3_5": ["さんごじゅうご"],
    "3_6": ["さんろくじゅうはち"],
    "3_7": ["さんしちにじゅういち"],
    "3_8": ["さんはにじゅうし"],
    "3_9": ["さんくにじゅうしち", "さんくにななじゅうしち"],

    "4_1": ["しいちし"],
    "4_2": ["しには"],
    "4_3": ["さんしじゅうに", "しさんじゅうに"],
    "4_4": ["ししじゅうろく"],
    "4_5": ["しごにじゅう"],
    "4_6": ["しろくじゅうし", "しろくにじゅうし"],
    "4_7": ["ししちじゅうはち", "ししちにじゅうはち"],
    "4_8": ["しはさんじゅうに"],
    "4_9": ["しくさんじゅうろく"],

    "5_1": ["ごいちご"],
    "5_2": ["ごにじゅう"],
    "5_3": ["ごさんじゅうご"],
    "5_4": ["ごしじゅう"],
    "5_5": ["ごごにじゅうご"],
    "5_6": ["ごろくさんじゅう"],
    "5_7": ["ごしちさんじゅうご"],
    "5_8": ["ごはしじゅう"],
    "5_9": ["ごくしじゅうご"],

    "6_1": ["ろくいちろく"],
    "6_2": ["ろくにじゅうに"],
    "6_3": ["ろくさんじゅうはち"],
    "6_4": ["ろくしじゅうし", "ろくにじゅうし"],
    "6_5": ["ろくごさんじゅう"],
    "6_6": ["ろくろくさんじゅうろく"],
    "6_7": ["ろくしちしじゅうに"],
    "6_8": ["ろくはしじゅうはち"],
    "6_9": ["ろくくごじゅうし"],

    "7_1": ["しちいちしち"],
    "7_2": ["しちにじゅうし"],
    "7_3": ["しちさんにじゅういち"],
    "7_4": ["しちしじゅうはち", "しちしにじゅうはち"],
    "7_5": ["しちごさんじゅうご"],
    "7_6": ["しちろくしじゅうに"],
    "7_7": ["しちしちしじゅうく", "しちしちしじゅうきゅう"],
    "7_8": ["しちはごじゅうろく"],
    "7_9": ["しちくろくじゅうさん"],

    "8_1": ["はちいちわ", "はちいち"],
    "8_2": ["はちにじゅうろく"],
    "8_3": ["はちさんにじゅうし"],
    "8_4": ["はちしさんじゅうに"],
    "8_5": ["はちごしじゅう"],
    "8_6": ["はちろくしじゅうはち"],
    "8_7": ["はちしちごじゅうろく"],
    "8_8": ["はちはちろくじゅうし", "はちのはちろくじゅうし"],
    "8_9": ["はちくしちじゅうに"],

    "9_1": ["くいちく"],
    "9_2": ["くにじゅうはち"],
    "9_3": ["くさんにじゅうしち"],
    "9_4": ["くしさんじゅうろく"],
    "9_5": ["くごしじゅうご"],
    "9_6": ["くろくごじゅうし"],
    "9_7": ["くしちろくじゅうさん"],
    "9_8": ["くはしちじゅうに"],
    "9_9": ["くくはちじゅういち"]
};

// 81問データの自動生成
for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
        kukuData.push({
            a: i,
            b: j,
            answer: i * j,
            key: `${i}_${j}`
        });
    }
}

// ==========================================
// ゲームの状態管理
// ==========================================
let gameState = {
    currentStage: 2, // 選択中の段
    unlockedStages: [2, 5, 10], // 解放されている段（初期は2, 5など。クリアで増える）
    score: 0,
    combo: 0,
    maxCombo: 0,
    currentQuestions: [],
    currentIndex: 0,
    monsterHp: 100,
    maxMonsterHp: 100,
    isDemo: false,
    stats: loadStats()
};

function loadStats() {
    const saved = localStorage.getItem('kuku_quest_stats');
    if (saved) {
        return JSON.parse(saved);
    }
    return {
        totalCorrect: 0,
        maxCombo: 0,
        mistakes: {} // "3_7": 5 (間違えた回数)
    };
}

function saveStats() {
    localStorage.setItem('kuku_quest_stats', JSON.stringify(gameState.stats));
}

// ==========================================
// 音声合成（将来のAivisSpeech差し替え対応構造）
// ==========================================
function playVoice(type) {
    // 将来的に audio/seikai.wav などを読み込む構造
    // 現在はブラウザの音声合成(SpeechSynthesis)を利用して自然に発話させます
    const synth = window.speechSynthesis;
    if (!synth) return;

    let text = "";
    if (type === "correct") text = "せいかい！すごい！";
    if (type === "retry") text = "もういちど、ゆっくり言ってみよう！";
    if (type === "only_number") text = "九九をさいごまで言ってみよう！";
    if (type === "stage_clear") text = "おめでとう！マスターになったよ！";

    // ※将来音声ファイルに差し替える場合は、以下のようにファイルを再生するように書き換えられます
    // const audio = new Audio(`audio/${type}.wav`);
    // audio.play().catch(e => {});

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ja-JP';
    utter.rate = 1.1;
    synth.speak(utter);
}

// ==========================================
// 画面遷移の管理
// ==========================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// ==========================================
// 初期化・イベントリスナー
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-btn').addEventListener('click', () => {
        showScreen('mic-screen');
    });

    document.getElementById('demo-btn').addEventListener('click', () => {
        gameState.isDemo = true;
        initStageSelect();
        showScreen('stage-screen');
    });

    document.getElementById('teacher-btn').addEventListener('click', () => {
        updateTeacherScreen();
        showScreen('teacher-screen');
    });

    document.getElementById('mic-ok-btn').addEventListener('click', () => {
        initMic();
    });

    document.getElementById('back-to-title').addEventListener('click', () => {
        showScreen('start-screen');
    });

    document.getElementById('to-stages-btn').addEventListener('click', () => {
        initStageSelect();
        showScreen('stage-screen');
    });

    document.getElementById('close-teacher-btn').addEventListener('click', () => {
        showScreen('start-screen');
    });

    document.getElementById('reset-data-btn').addEventListener('click', () => {
        if (confirm('データをすべてリセットしますか？')) {
            localStorage.removeItem('kuku_quest_stats');
            gameState.stats = loadStats();
            updateTeacherScreen();
            alert('リセットしました。');
        }
    });

    document.getElementById('skip-btn').addEventListener('click', () => {
        nextQuestion(true); // スキップ
    });

    document.getElementById('quit-battle-btn').addEventListener('click', () => {
        stopRecognition();
        initStageSelect();
        showScreen('stage-screen');
    });
});

// ==========================================
// マイク初期化
// ==========================================
let recognition = null;
let isListening = false;

function initMic() {
    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('お使いのブラウザは音声認識に対応していません。Google Chromeをお使いください。（デモモードで起動します）');
            gameState.isDemo = true;
            initStageSelect();
            showScreen('stage-screen');
            return;
        }

        recognition = new SpeechRecognition();
        recognition.lang = 'ja-JP';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            document.getElementById('speech-result').innerText = `ききとり: 「${transcript}」`;
            checkAnswer(transcript);
        };

        recognition.onerror = (event) => {
            console.log('音声認識エラー:', event.error);
        };

        recognition.onend = () => {
            if (isListening && !gameState.isDemo) {
                try { recognition.start(); } catch(e){}
            }
        };

        gameState.isDemo = false;
        initStageSelect();
        showScreen('stage-screen');
    } catch(e) {
        console.error(e);
        gameState.isDemo = true;
        initStageSelect();
        showScreen('stage-screen');
    }
}

function startRecognition() {
    if (gameState.isDemo || !recognition) return;
    isListening = true;
    try {
        recognition.start();
    } catch(e) {}
}

function stopRecognition() {
    isListening = false;
    if (recognition) {
        try { recognition.stop(); } catch(e) {}
    }
}

// ==========================================
// ステージセレクト画面の構築
// ==========================================
function initStageSelect() {
    const grid = document.getElementById('stage-list');
    grid.innerHTML = '';

    for (let i = 1; i <= 9; i++) {
        const btn = document.createElement('button');
        btn.className = 'stage-btn';
        btn.innerText = `${i} の だん`;
        
        // 段階的開放のロジック（全ての段を遊べるが、クリアしていくと色が変わるなどの演出）
        btn.classList.add('unlocked');
        
        btn.addEventListener('click', () => {
            startBattle(i);
        });
        grid.appendChild(btn);
    }
}

// ==========================================
// バトル開始
// ==========================================
let currentQ = null;

function startBattle(stageNum) {
    gameState.currentStage = stageNum;
    gameState.score = 0;
    gameState.combo = 0;
    
    // 該当する段の問題を抽出（例: 3の段なら 3×1 〜 3×9）
    gameState.currentQuestions = kukuData.filter(q => q.a === stageNum);
    // シャッフル
    gameState.currentQuestions.sort(() => Math.random() - 0.5);
    gameState.currentIndex = 0;

    document.getElementById('current-stage-title').innerText = `${stageNum} の だん`;
    showScreen('battle-screen');
    loadNextQuestion();
    startRecognition();
}

function loadNextQuestion() {
    if (gameState.currentIndex >= gameState.currentQuestions.length) {
        // ステージクリア！
        stopRecognition();
        playVoice("stage_clear");
        
        // 次の段をアンロック
        if (gameState.currentStage < 9 && !gameState.unlockedStages.includes(gameState.currentStage + 1)) {
            gameState.unlockedStages.push(gameState.currentStage + 1);
        }

        document.getElementById('res-correct').innerText = gameState.score;
        document.getElementById('res-combo').innerText = gameState.maxCombo;
        document.getElementById('result-message').innerText = `おめでとう！${gameState.currentStage}のだん マスターになったよ！`;
        showScreen('result-screen');
        return;
    }

    currentQ = gameState.currentQuestions[gameState.currentIndex];
    document.getElementById('question-text').innerText = `${currentQ.a} × ${currentQ.b}`;
    document.getElementById('feedback-text').innerText = `大きな声でよもう！`;
    
    // モンスターHPリセット
    gameState.monsterHp = 100;
    updateHpBar();

    // デモモードの場合はクリックで正解扱いにする仕組みを追加
    if (gameState.isDemo) {
        document.getElementById('question-text').onclick = () => {
            checkAnswer(String(currentQ.answer)); // デモ用擬似正解
        };
        document.getElementById('speech-result').innerText = "【デモモード】問題文字をクリックすると正解します";
    }
}

function updateHpBar() {
    const per = (gameState.monsterHp / gameState.maxMonsterHp) * 100;
    document.getElementById('monster-hp').style.width = `${per}%`;
}

// ==========================================
// 判定ロジック（非常に重要な音声認識の条件）
// ==========================================
function normalizeSpeech(text) {
    return text.replace(/[\s,\.,！、"]/g, "").toLowerCase();
}

function checkAnswer(spokenText) {
    if (!currentQ) return;
    const cleanSpoken = normalizeSpeech(spokenText);

    // 1. 数字だけ（例: "28"）言った場合のチェック
    const ansStr = String(currentQ.answer);
    if (cleanSpoken === ansStr || cleanSpoken.endsWith(ansStr)) {
        // 数字だけで九九を唱えていない場合
        document.getElementById('feedback-text').innerText = "「九九をさいごまで言ってみよう！」";
        playVoice("only_number");
        return;
    }

    // 2. 正しい九九の読み方に合致するか判定
    const validList = standardReadings[currentQ.key] || [];
    let isCorrect = false;

    for (let valid of validList) {
        if (cleanSpoken.includes(valid) || cleanSpoken === valid) {
            isCorrect = true;
            break;
        }
    }

    // あいまいな揺れへの対応（答えの数字が含まれており、かつ前半の数字の読みが含まれているか）
    if (!isCorrect) {
        if (cleanSpoken.includes(ansStr) && (cleanSpoken.includes(String(currentQ.a)) || cleanSpoken.includes(String(currentQ.b)))) {
            isCorrect = true; // ゆるやかな判定許可
        }
    }

    if (isCorrect) {
        // 正解演出
        playVoice("correct");
        gameState.score++;
        gameState.combo++;
        if (gameState.combo > gameState.maxCombo) {
            gameState.maxCombo = gameState.combo;
        }

        // 統計データ更新
        gameState.stats.totalCorrect++;
        if (gameState.combo > gameState.stats.maxCombo) {
            gameState.stats.maxCombo = gameState.combo;
        }
        saveStats();

        document.getElementById('score-display').innerText = `せいかい: ${gameState.score}`;
        document.getElementById('combo-display').innerText = `コンボ: ${gameState.combo}`;
        document.getElementById('feedback-text').innerText = "✨ せいかい！モンスターにダメージ！ ✨";

        // モンスターにダメージアニメーション
        gameState.monsterHp = 0;
        updateHpBar();

        setTimeout(() => {
            gameState.currentIndex++;
            loadNextQuestion();
        }, 1000);

    } else {
        // 不正解・または聞き取り中の場合（失敗を強調せず、優しく促す）
        // 頻繁に間違える場合の集計
        if (!gameState.stats.mistakes[currentQ.key]) {
            gameState.stats.mistakes[currentQ.key] = 0;
        }
        gameState.stats.mistakes[currentQ.key]++;
        saveStats();

        document.getElementById('feedback-text').innerText = "もういちど、ゆっくり言ってみよう！";
    }
}

function nextQuestion(isSkip = false) {
    if (isSkip) {
        gameState.combo = 0;
        document.getElementById('combo-display').innerText = `コンボ: 0`;
    }
    gameState.currentIndex++;
    loadNextQuestion();
}

// ==========================================
// 教師用画面の集計表示
// ==========================================
function updateTeacherScreen() {
    document.getElementById('t-total-correct').innerText = gameState.stats.totalCorrect;
    document.getElementById('t-max-combo').innerText = gameState.stats.maxCombo;

    const listEl = document.getElementById('t-mistake-list');
    listEl.innerHTML = '';

    // 間違いが多い順にソート
    const sortedMistakes = Object.entries(gameState.stats.mistakes).sort((a, b) => b[1] - a[1]);

    if (sortedMistakes.length === 0) {
        listEl.innerHTML = '<li>まだまちがえたデータはありません</li>';
        return;
    }

    for (let [key, count] of sortedMistakes.slice(0, 5)) { // 上位5件
        const parts = key.split('_');
        const li = document.createElement('li');
        li.innerText = `${parts[0]} × ${parts[1]} （まちがい回数: ${count}回）`;
        listEl.appendChild(li);
    }
}