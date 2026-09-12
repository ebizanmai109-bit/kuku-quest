let currentStage = 2;
let questions = [];
let currentIndex = 0;
let meaningStep = 0;
let currentAudioKey = "";
let currentInputStr = "";
let kukuData = {};

// 起動時に kuku.json を読み込む
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/kuku.json');
        kukuData = await response.json();
    } catch (e) {
        console.error("kuku.jsonの読み込みに失敗しました", e);
    }
});

// 音声を再生する関数
function playAudio(key) {
    const audio = new Audio(`audio/${key}.wav`);
    audio.play().catch(error => {
        console.log("音声の再生がブロックされたか、ファイルが見つかりません:", error);
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
    if (currentIndex >= 5) {
        showScreen('screen-clear');
        document.getElementById('clear-message').innerText = `${currentStage}の段をクリアしました！`;
        return;
    }

    const q = questions[currentIndex];
    document.getElementById('score-board').innerText = `もんだい ${currentIndex + 1} / 5`;
    document.getElementById('problem-display').innerText = `${q.a} × ${q.b} = ?`;
    document.getElementById('hint-text').innerText = "";
    
    currentAudioKey = `${q.a}-${q.b}`;
    currentInputStr = "";
    updateInputDisplay();

    // 問題が出た瞬間にAivisSpeechの音声を再生
    playAudio(currentAudioKey);
}

function inputNumber(num) {
    if (currentInputStr.length < 2) { // 九九の答えは最大2桁
        currentInputStr += num;
        updateInputDisplay();
    }
}

function clearInput() {
    currentInputStr = "";
    updateInputDisplay();
}

function updateInputDisplay() {
    document.getElementById('input-number').innerText = currentInputStr === "" ? "?" : currentInputStr;
}

function submitAnswer() {
    if (currentInputStr === "") return;

    const q = questions[currentIndex];
    const userAns = parseInt(currentInputStr, 10);

    if (userAns === q.ans) {
        document.getElementById('hint-text').innerHTML = `<span style="color:#27ae60;">🎉 正解です！</span>`;
        // 正解時は改めて正しいAivisSpeechの九九音声を再生
        playAudio(currentAudioKey);
        
        setTimeout(() => {
            currentIndex++;
            loadQuestion();
        }, 1800);
    } else {
        document.getElementById('hint-text').innerHTML = `<span style="color:#c0392b;">おしい！もう一度考えてみよう。</span>`;
        currentInputStr = "";
        updateInputDisplay();
    }
}