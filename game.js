// ===============================
// Animal Fighter
// game.js Ver4.0
// ===============================

// ------------------------------
// ゲーム進行
// ------------------------------
let currentStage = 0;
let playerTurn = true;
let gameFinished = false;

// ------------------------------
// プレイヤー
// ------------------------------
const player = {
    name: "トカゲ",
    hp: 100,
    maxHp: 100,
    coins: 0,

    defending: false,

    companionAttackDone:false,

    // バリアの実を使ったか
    barrierActive: false,

    // 敵の攻撃を休ませる残り回数
rainbowBarrierTurns: 0,

    attackBonus: 0,
    hasHelmet: false,
    hasStick: false,
    hasSword: false,
hasSteelSword: false,
hasSteelHelmet: false,

bossCompanionLimit: 0,
bossCompanionOrder: [],
};

// ------------------------------
// 持ち物
// ------------------------------
const inventory = {
    bananaChips: 0,
    fruit: 0,
    healFruit: 0,

    specialFruit: 0,
    barrierFruit: 0,
    rainbowBarrier: 0,

    woodenStick: 0,
    leafHelmet: 0,
    woodenSword: 0,
    steelSword: 0,
    steelHelmet: 0
};

// ------------------------------
// 仲間
// ------------------------------
const joinedFriends = [];

const friendData = [

{ name:"うさぎ", darkName:"暗黒うさぎ", image:"images/rabbit.png" },

{ name:"かめ", darkName:"暗黒かめ", image:"images/turtle.png" },

{ name:"いぬ", darkName:"暗黒いぬ", image:"images/dog.png" },

{ name:"ねこ", darkName:"暗黒ねこ", image:"images/cat.png" },

{ name:"さる", darkName:"暗黒さる", image:"images/monkey.png" },

{ name:"しか", darkName:"暗黒しか", image:"images/deer.png" },

{ name:"いのしし", darkName:"暗黒いのしし", image:"images/boar.png" },

{ name:"ダチョウ", darkName:"暗黒ダチョウ", image:"images/ostrich.png" },

{ name:"くま", darkName:"暗黒くま", image:"images/bear.png" },

{ name:"ゴリラ", darkName:"暗黒ゴリラ", image:"images/gorilla.png" },

{ name:"ライオン", darkName:"暗黒ライオン", image:"images/lion.png" },

{ name:"バイソン", darkName:"暗黒バイソン", image:"images/bison.png" },

{ name:"キリン", darkName:"暗黒キリン", image:"images/giraffe.png" },

{ name:"ぞう", darkName:"暗黒ぞう", image:"images/elephant.png" }

];

// ------------------------------
// 敵
// ------------------------------
const enemy = {
    name:"暗黒うさぎ",
    hp:100,
    maxHp:100,
    image:"images/rabbit_dark.png"
};


// ===============================
// ストーリーをスキップ
// ===============================
function skipStory() {

    // ストーリーを飛ばして
    // 最初のバトルへ
    beginBattle();
}

// ------------------------------
// ステージ
// ------------------------------
const stages = [
    {
    name: "暗黒うさぎ",
    normalName: "うさぎ",
    hp: 100,
    attackMin: 6,
    attackMax: 10,
    coins: 100,
    darkImage: "images/rabbit_dark.png",
    normalImage: "images/rabbit.png",
    background: "images/forest_dark.png"
},

{
    name: "暗黒かめ",
    normalName: "かめ",
    hp: 150,
    attackMin: 8,
    attackMax: 12,
    coins: 150,
    darkImage: "images/turtle_dark.png",
    normalImage: "images/turtle.png",
    background: "images/swamp_dark.png"
},

{
    name: "暗黒いぬ",
    normalName: "いぬ",
    hp: 180,
    attackMin: 10,
    attackMax: 15,
    coins: 200,
    darkImage: "images/dog_dark.png",
    normalImage: "images/dog.png",
    background: "images/grassland_dark.png"
},

{
    name: "暗黒ねこ",
    normalName: "ねこ",
    hp: 220,
    attackMin: 12,
    attackMax: 18,
    coins: 250,
    darkImage: "images/cat_dark.png",
    normalImage: "images/cat.png",
    background: "images/flower_dark.png"
},

{
    name: "暗黒さる",
    normalName: "さる",
    hp: 260,
    attackMin: 15,
    attackMax: 22,
    coins: 300,
    darkImage: "images/monkey_dark.png",
    normalImage: "images/monkey.png",
    background: "images/jungle_dark.png"
},

{
    name: "暗黒しか",
    normalName: "しか",
    hp: 320,
    attackMin: 18,
    attackMax: 26,
    coins: 350,
    darkImage: "images/deer_dark.png",
    normalImage: "images/deer.png",
    background: "images/autumn_dark.png"
},

{
    name: "暗黒いのしし",
    normalName: "いのしし",
    hp: 400,
    attackMin: 22,
    attackMax: 30,
    coins: 400,
    darkImage: "images/boar_dark.png",
    normalImage: "images/boar.png",
    background: "images/rock_dark.png"
},

{
    name: "暗黒ダチョウ",
    normalName: "ダチョウ",
    hp: 500,
    attackMin: 26,
    attackMax: 35,
    coins: 450,
    darkImage: "images/ostrich_dark.png",
    normalImage: "images/ostrich.png",
    background: "images/desert_dark.png"
},

{
    name: "暗黒くま",
    normalName: "くま",
    hp: 650,
    attackMin: 32,
    attackMax: 42,
    coins: 500,
    darkImage: "images/bear_dark.png",
    normalImage: "images/bear.png",
    background: "images/snow_dark.png"
},

{
    name: "暗黒ゴリラ",
    normalName: "ゴリラ",
    hp: 850,
    attackMin: 38,
    attackMax: 50,
    coins: 550,
    darkImage: "images/gorilla_dark.png",
    normalImage: "images/gorilla.png",
    background: "images/volcano_dark.png"
},

{
    name: "暗黒ライオン",
    normalName: "ライオン",
    hp: 1100,
    attackMin: 45,
    attackMax: 60,
    coins: 600,
    darkImage: "images/lion_dark.png",
    normalImage: "images/lion.png",
    background: "images/thunder_dark.png"
},

{
    name: "暗黒バイソン",
    normalName: "バイソン",
    hp: 1400,
    attackMin: 55,
    attackMax: 75,
    coins: 650,
    darkImage: "images/bison_dark.png",
    normalImage: "images/bison.png",
    background: "images/ruins_dark.png"
},

{
    name: "暗黒キリン",
    normalName: "キリン",
    hp: 1800,
    attackMin: 65,
    attackMax: 90,
    coins: 800,
    darkImage: "images/giraffe_dark.png",
    normalImage: "images/giraffe.png",
    background: "images/sky_dark.png"
},

{
    name: "暗黒ぞう",
    normalName: "ぞう",
    hp: 2200,
    attackMin: 80,
    attackMax: 110,
    coins: 1000,
    darkImage: "images/elephant_dark.png",
    normalImage: "images/elephant.png",
    background: "images/mystic_dark.png"
},

{
    name: "暗黒王ダークタイガー",
    normalName: "ダークタイガー",
    hp: 3000,
    attackMin: 95,
    attackMax: 140,
    coins: 5000,
    darkImage: "images/dark_tiger.png",
    normalImage: "images/dark_tiger.png",
    background: "images/dark_castle.png",
    isBoss: true
}

];

// ===============================
// 画面をすべて隠す
// ===============================
function hideAllScreens() {

    const screenIds = [
    "title",
    "meteorScene",
    "story",
    "enemyIntroScene",
    "battle",
    "companionScene",
    "shop",
    "inventory",
    "bossIntro",
    "bossRuleScene",
    "tigerRescueScene",
    "ending"
];


    screenIds.forEach(id => {

        const screen =
            document.getElementById(id);

        if (screen) {
            screen.style.display = "none";
        }

    });
}

// =====================================
// BGM・効果音の管理
// =====================================

// 現在流れているBGM
let currentBgm = null;


// =====================================
// BGMを再生・切り替え
// =====================================
function playBgm(id) {

    console.log(
        "🎵 BGM切り替え：",
        id
    );

    const bgm =
        document.getElementById(id);


    // audioが見つからない
    if (!bgm) {

        console.log(
            "❌ BGMが見つかりません：",
            id
        );

        return;
    }


    // すでに同じBGMなら何もしない
    if (currentBgm === bgm) {
        return;
    }


    // 今までのBGMを停止
    if (currentBgm) {

        currentBgm.pause();

        currentBgm.currentTime = 0;
    }


    // 新しいBGMを登録
    currentBgm = bgm;

    currentBgm.volume = 0.35;


    // 再生
    currentBgm.play()
        .then(() => {

            console.log(
                "✅ BGM再生成功：",
                id
            );

        })
        .catch(error => {

            console.log(
                "❌ BGM再生失敗：",
                id,
                error
            );

        });
}


// =====================================
// BGMを停止
// =====================================
function stopBgm() {

    if (!currentBgm) {
        return;
    }

    currentBgm.pause();

    currentBgm.currentTime = 0;

    currentBgm = null;
}


// =====================================
// 効果音を再生
// =====================================
function playSound(id) {

    const sound =
        document.getElementById(id);

    if (!sound) {

        console.log(
            "❌ 効果音が見つかりません：",
            id
        );

        return;
    }

    sound.currentTime = 0;

    sound.volume = 0.65;

    sound.play().catch(error => {

        console.log(
            "❌ 効果音再生失敗：",
            id,
            error
        );

    });
}
// ===============================
// ゲーム開始
// ===============================
function startGame() {

    playBgm("titleBgm");

    hideAllScreens();

    const meteorScene =
        document.getElementById("meteorScene");

    const meteorImage =
        document.getElementById("meteorImage");

    const meteorMessage =
        document.getElementById("meteorMessage");

    const impactFlash =
        document.getElementById("impactFlash");


    meteorScene.style.display = "block";

    meteorMessage.textContent =
        "平和などうぶつの森";

    meteorScene.classList.remove("darkForest");
    meteorImage.classList.remove("meteor-fall");
    impactFlash.classList.remove("flash");


    // 1秒後に隕石が落ちる
    setTimeout(() => {

        meteorMessage.textContent =
            "黒い隕石が落ちてきた！！";

        meteorImage.classList.add("meteor-fall");

    },1000);


    // 衝突
    setTimeout(() => {

        impactFlash.classList.add("flash");

    },2800);


    // 森が暗黒化
    setTimeout(() => {

        meteorScene.classList.add("darkForest");

        meteorMessage.textContent =
            "森は暗黒の世界へ変わってしまった…";

    },3300);


    // ストーリー画面へ
    setTimeout(() => {

        hideAllScreens();

        document.getElementById("story").style.display =
            "block";

    },5200);

}


// ===============================
// 最初のバトル開始
// ===============================
function beginBattle() {

    currentStage = 0;
    playerTurn = true;
    gameFinished = false;

    player.hp = player.maxHp;
    player.defending = false;
    player.barrierActive = false;

    showEnemyIntro();
}

// ===============================
// 敵の出現シーン
// ===============================
function showEnemyIntro() {

    const stageData =
        stages[currentStage];

    if (!stageData) {
        showEnding();
        return;
    }


    // ラスボスは専用登場画面へ
    if (stageData.isBoss) {

        showBossIntro();

        return;
    }

    // ★ 通常の敵出現音
    playSound("enemyIntroSound");


    hideAllScreens();


    const introScene =
        document.getElementById(
            "enemyIntroScene"
        );

    const introImage =
        document.getElementById(
            "enemyIntroImage"
        );

    const introStage =
        document.getElementById(
            "enemyIntroStage"
        );

    const introMessage =
        document.getElementById(
            "enemyIntroMessage"
        );

    const introSmoke =
        document.getElementById(
            "enemyIntroSmoke"
        );


    // 敵登場画面がない場合
    if (!introScene) {

        startCurrentBattle();

        return;
    }


    introScene.style.display =
        "block";


    introScene.style.backgroundImage = `
        linear-gradient(
            rgba(0, 0, 0, 0.45),
            rgba(0, 0, 0, 0.65)
        ),
        url("images/forest_dark.png")
    `;


    // ステージ番号
    if (introStage) {

        introStage.textContent =
            `ステージ${currentStage + 1}`;
    }


    // 敵画像
    if (introImage) {

        introImage.src =
            stageData.darkImage;

        introImage.alt =
            stageData.name;

        introImage.classList.remove(
            "enemy-appear"
        );

        void introImage.offsetWidth;
    }


    // 煙
    if (introSmoke) {

        introSmoke.classList.remove(
            "smoke-appear"
        );

        void introSmoke.offsetWidth;
    }


    // 最初のメッセージ
    if (introMessage) {

        introMessage.textContent =
            "森の奥から何かが近づいてくる……";
    }


    // 敵が登場
    setTimeout(() => {

        if (introImage) {

            introImage.classList.add(
                "enemy-appear"
            );
        }

        if (introSmoke) {

            introSmoke.classList.add(
                "smoke-appear"
            );
        }

    }, 400);


    // 敵名を表示
    setTimeout(() => {

        if (introMessage) {

            introMessage.textContent =
                `${stageData.name}が現れた！`;
        }

    }, 2100);


    // バトル開始
    setTimeout(() => {

        startCurrentBattle();

    }, 3400);
}


// ===============================
// 現在のステージのバトルを開始
// ===============================
function startCurrentBattle() {

    hideAllScreens();


    const battleScreen =
        document.getElementById(
            "battle"
        );


    if (battleScreen) {

        battleScreen.style.display =
            "block";
    }


    playerTurn = true;

    gameFinished = false;

    player.defending = false;

    player.barrierActive = false;


    loadStage();

    updateHP();

    updateCoin();

    updateInventory();

    updateBattleItemButtons();

    updateEquipmentDisplay();
}

// ===============================
// ステージを読み込む
// ===============================
function loadStage() {

    const stageData = stages[currentStage];

    

    // ステージデータがない場合はエンディングへ
    if (!stageData) {
        showEnding();
        return;
    }
// 通常ステージのBGM
if (!stageData.isBoss) {

    playBgm("battleBgm");

}

    // -------------------------------
    // 敵データを更新
    // -------------------------------
    enemy.name = stageData.name;
    enemy.hp = stageData.hp;
    enemy.maxHp = stageData.hp;
    enemy.image = stageData.darkImage;


    // -------------------------------
    // HTMLの要素を取得
    // -------------------------------
    const battleScreen =
        document.getElementById("battle");

    const stageElement =
        document.getElementById("stage");

    const enemyNameElement =
        document.getElementById("enemyName");

    const battleEnemyNameElement =
        document.getElementById("battleEnemyName");

    const enemyImageElement =
        document.getElementById("enemyImage");


    // -------------------------------
    // バトル背景
    // 通常：暗黒の森
    // ラスボス：暗黒城
    // -------------------------------
    if (battleScreen) {

        const backgroundImage =
            stageData.isBoss
                ? "images/castel_dark.png"
                : "images/forest_dark.png";

        battleScreen.style.backgroundImage = `
            linear-gradient(
                rgba(0, 0, 0, 0.45),
                rgba(0, 0, 0, 0.45)
            ),
            url("${backgroundImage}")
        `;

        battleScreen.style.backgroundSize = "cover";
        battleScreen.style.backgroundPosition = "center";
        battleScreen.style.backgroundRepeat = "no-repeat";
    }


    // -------------------------------
    // ステージ名を表示
    // -------------------------------
    if (stageElement) {

        if (stageData.isBoss) {
            stageElement.textContent =
                "最終ステージ";
        } else {
            stageElement.textContent =
                `ステージ${currentStage + 1}`;
        }
    }


    // -------------------------------
    // 敵の名前を表示
    // -------------------------------
    if (enemyNameElement) {
        enemyNameElement.textContent =
            stageData.name;
    }

    if (battleEnemyNameElement) {
        battleEnemyNameElement.textContent =
            stageData.name;
    }


    // -------------------------------
    // 敵画像を表示
    // -------------------------------
    if (enemyImageElement) {

        enemyImageElement.src =
            stageData.darkImage;

        enemyImageElement.alt =
            stageData.name;

        enemyImageElement.classList.remove(
            "savedAnimal"
        );
    }


    // -------------------------------
    // バトル状態を初期化
    // -------------------------------
   playerTurn = true;
   updateBattleTurnEffect();
gameFinished = false;

player.companionAttackDone = false;
player.defending = false;
player.barrierActive = false;

enableButtons();
updateBattleItemButtons(); 

if (stageData.isBoss) {

    enableCompanionButtons();

} else {

    disableCompanionButtons();
}

showMessage(
    stageData.isBoss
        ? `${stageData.name}が現れた！仲間の攻撃も選べる！`
        : `${stageData.name}が現れた！`
);
}

// ===============================
// 攻撃できる側を光らせる
// ===============================
function updateBattleTurnEffect() {

    const playerImage =
        document.getElementById("playerImage");

    const enemyImage =
        document.getElementById("enemyImage");


    if (!playerImage || !enemyImage) {
        return;
    }


    // いったん全部解除
    playerImage.classList.remove(
        "battle-active",
        "battle-inactive"
    );

    enemyImage.classList.remove(
        "battle-active",
        "battle-inactive"
    );


    // プレイヤーのターン
    if (playerTurn && !gameFinished) {

        playerImage.classList.add(
            "battle-active"
        );

        enemyImage.classList.add(
            "battle-inactive"
        );

    }

    // 敵のターン
    else if (!gameFinished) {

        enemyImage.classList.add(
            "battle-active"
        );

        playerImage.classList.add(
            "battle-inactive"
        );
    }
}

// ===============================
// HP表示を更新
// ===============================
function updateHP() {

    const playerPercent =
        Math.max(
            0,
            (player.hp / player.maxHp) * 100
        );

    const enemyPercent =
        Math.max(
            0,
            (enemy.hp / enemy.maxHp) * 100
        );


    const playerHPFill =
        document.getElementById(
            "playerHPFill"
        );

    const enemyHPFill =
        document.getElementById(
            "enemyHPFill"
        );

    const playerHPText =
        document.getElementById(
            "playerHPText"
        );

    const enemyHPText =
        document.getElementById(
            "enemyHPText"
        );


    if (playerHPFill) {

        playerHPFill.style.width =
            playerPercent + "%";

    }

    if (enemyHPFill) {

        enemyHPFill.style.width =
            enemyPercent + "%";

    }

    if (playerHPText) {

        playerHPText.textContent =
            `${player.hp} / ${player.maxHp}`;

    }

    if (enemyHPText) {

        enemyHPText.textContent =
            `${enemy.hp} / ${enemy.maxHp}`;

    }

}


// ===============================
// コイン表示を更新
// ===============================
function updateCoin() {

    const coinElement =
        document.getElementById("coin");

    const shopCoinElement =
        document.getElementById(
            "shopCoin"
        );


    if (coinElement) {

        coinElement.textContent =
            player.coins;

    }

    if (shopCoinElement) {

        shopCoinElement.textContent =
            player.coins;

    }

}


// ===============================
// バトルメッセージ
// ===============================
function showMessage(message) {

    const logElement =
        document.getElementById("log");

    if (logElement) {

        logElement.textContent =
            message;

    }

}


// ===============================
// プレイヤーの攻撃
// ===============================
function attack(type) {

    if (
        !playerTurn ||
        gameFinished
    ) {
        return;
    }


    playerTurn = false;
    updateBattleTurnEffect();

    disableButtons();
    disableCompanionButtons();


    let damage = 0;
    let attackName = "";


    // -------------------------------
    // かみつく
    // -------------------------------
    if (type === "bite") {

        playSound("biteSound");

        damage =
            randomNumber(18, 25);

        attackName =
            "かみつく";
    }


    // -------------------------------
    // 毒
    // -------------------------------
    else if (type === "poison") {

        playSound("poisonSound");

        damage =
            randomNumber(15, 30);

        attackName =
            "毒攻撃";
    }


    // -------------------------------
    // ひっかき
    // -------------------------------
    else if (type === "scratch") {

        playSound("scratchSound");

        damage =
            randomNumber(12, 22);

        attackName =
            "ひっかき";
    }


    // -------------------------------
    // 脱皮
    // HP回復＋次の敵攻撃を半減
    // -------------------------------
    else if (type === "shed") {

        playSound("shedSound");

        player.defending = true;

        const beforeHp =
            player.hp;

        const healAmount = 30;

        player.hp = Math.min(
            player.maxHp,
            player.hp + healAmount
        );

        const actualHeal =
            player.hp - beforeHp;

        updateHP();

        showMessage(
            `🛡️ トカゲは脱皮した！` +
            `HPが${actualHeal}回復！` +
            `次の攻撃ダメージを半分にする！`
        );


        setTimeout(() => {

            const stageData =
                stages[currentStage];


            // ラスボス戦で仲間が残っている場合
            if (
                stageData &&
                stageData.isBoss &&
                player.bossCompanionLimit > 0
            ) {

                playerTurn = true;

                disableButtons();
                enableCompanionButtons();

                showMessage(
                    `🤝 追撃する仲間を1匹選ぼう！` +
                    `残り${player.bossCompanionLimit}匹`
                );

                return;
            }


            // 通常ステージ、または仲間が0匹
            enemyAttack();

        }, 1000);

        return;
    }


    // -------------------------------
    // 存在しない技
    // -------------------------------
    else {

        playerTurn = true;

        enableButtons();
        updateBattleItemButtons();

        return;
    }


    // この下は今までの
    // 「武器の追加攻撃力」から続ける

    // -------------------------------
    // 武器の追加攻撃力
    // -------------------------------
    damage +=
        player.attackBonus;


    // 敵へダメージ
    enemy.hp = Math.max(
        0,
        enemy.hp - damage
    );


    updateHP();

    showDamage(damage);

    showMessage(
        `トカゲの${attackName}！` +
        `${damage}ダメージ！`
    );


    // -------------------------------
    // 敵を倒した場合
    // -------------------------------
    if (enemy.hp <= 0) {

        setTimeout(() => {

            victory();

        }, 700);

        return;
    }


    // -------------------------------
    // 攻撃後のターン処理
    // -------------------------------
    setTimeout(() => {

        const stageData =
            stages[currentStage];


        // ラスボス戦
        if (
            stageData &&
            stageData.isBoss
        ) {

            // 攻撃できる仲間が残っている
            if (
                player.bossCompanionLimit > 0
            ) {

                playerTurn = true;

                // トカゲの技は一旦使えない
                disableButtons();

                // 仲間の追撃だけ有効化
                enableCompanionButtons();

                showMessage(
                    `🤝 追撃する仲間を1匹選ぼう！` +
                    `残り${player.bossCompanionLimit}匹`
                );

                return;
            }


            // 仲間が全員攻撃できない場合
            showMessage(
                "仲間たちは攻撃できない！" +
                "トカゲだけで戦う！"
            );

            setTimeout(() => {

                enemyAttack();

            }, 800);

            return;
        }


        // -------------------------------
        // 通常ステージは敵のターン
        // -------------------------------
        enemyAttack();

    }, 1000);
}


// ===============================
// 敵の攻撃
// ===============================
function enemyAttack() {

    if (gameFinished) {
        return;
    }


    const stageData =
        stages[currentStage];

        // レインボーバリア中は敵の攻撃を休ませる
if (player.rainbowBarrierTurns > 0) {

    player.rainbowBarrierTurns -= 1;

    showMessage(
        `🌈 レインボーバリア発動！` +
        `${enemy.name}は攻撃できない！` +
        ` 残り${player.rainbowBarrierTurns}回`
    );

    setTimeout(() => {

       playerTurn = true;

// トカゲの攻撃を使えるようにする
enableButtons();

// 仲間はトカゲの攻撃後まで使えない
disableCompanionButtons();

updateBattleItemButtons();

showMessage(
    "トカゲの攻撃を選ぼう！"
);

        showMessage(
            "敵は休んでいる！続けて攻撃を選ぼう！"
        );

    }, 800);

    return;
}

        const battle = document.getElementById("battle");

// ラスボスだけ暗黒城
if (currentStage === stages.length - 1) {

    battle.style.backgroundImage =
        "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('images/castel_dark.png')";

} else {

    battle.style.backgroundImage =
        "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('images/forest_dark.png')";

}

battle.style.backgroundSize = "cover";
battle.style.backgroundPosition = "center";
battle.style.backgroundRepeat = "no-repeat";


    let damage =
        randomNumber(
            stageData.attackMin,
            stageData.attackMax
        );

        // ===============================
// バリアの実
// 次の敵の攻撃を完全に防ぐ
// ===============================
if (player.barrierActive) {

    // バリアを1回使ったので解除
    player.barrierActive = false;

    // ダメージは0
    damage = 0;

    showMessage(
        "🛡️ バリアが発動！敵の攻撃を完全に防いだ！"
    );

    // HP表示更新
    updateHP();


    // 少し待ってトカゲのターンへ
    setTimeout(() => {

        playerTurn = true;

        enableButtons();

        disableCompanionButtons();

        updateBattleItemButtons();

        showMessage(
            "🦎 トカゲの番だ！攻撃を選ぼう！"
        );

    }, 1000);


    // ★ここ重要
    // この下の通常ダメージ処理を実行しない
    return;
}


    // 脱皮中ならダメージ半分
    // 脱皮中は敵のダメージを半分にする
if (player.defending) {

    damage = Math.floor(
        damage / 2
    );

    player.defending = false;

    showMessage(
        `🛡️ 脱皮した皮が攻撃をやわらげた！${damage}ダメージ受けた！`
    );

} else {

    showMessage(
        `${enemy.name}の攻撃！トカゲは${damage}ダメージ受けた！`
    );
}


    player.hp -= damage;

if (player.hp < 0) {
    player.hp = 0;
}

updateHP();


// ラスボスの攻撃を実際に受けた場合、
// 攻撃できる仲間が2匹ずつ減る
if (
    stageData &&
    stageData.isBoss &&
    damage > 0 &&
    player.hp > 0
) {

    setTimeout(() => {

        reduceBossCompanions();

    }, 700);
}


    // ゲームオーバー
    if (player.hp <= 0) {

        setTimeout(() => {

            gameOver();

        }, 800);

        return;

    }


    // プレイヤーのターンへ
    setTimeout(() => {

        playerTurn = true;

        updateBattleTurnEffect();

        enableButtons();

        updateBananaButton();

        showMessage(
            "トカゲの番だ！技を選ぼう！"
        );

    }, 800);

}


// ===============================
// ステージ勝利
// ===============================
function victory() {

    const stageData =
        stages[currentStage];

        // ===============================
// 勝利時のサウンド
// ===============================
if (stageData.isBoss) {

    // ラスボス戦BGMを停止
    stopBgm();

    // ラスボス撃破音
    playSound("bossClearSound");

} else {

    // 通常バトルBGMを停止
    stopBgm();

    // 通常ステージクリア音
    playSound("victorySound");
}


    // ステージごとのコインを獲得
    player.coins +=
        stageData.coins;


    // ===============================
// ステージクリア報酬
// ステージ10以降はHPアップが大きくなる
// ===============================

let hpReward = 10;

// ステージ10以降（現在のステージ番号は0から始まるので9以上）
if (currentStage >= 9) {
    hpReward = 100;
}

player.maxHp += hpReward;
player.hp += hpReward;

if (player.hp > player.maxHp) {
    player.hp = player.maxHp;
}

    // 念のため最大HPを超えないようにする
    if (player.hp > player.maxHp) {
        player.hp = player.maxHp;
    }


    updateCoin();
    updateHP();

    disableButtons();


   showMessage(
    `${stageData.name}を倒した！
🪙 ${stageData.coins}コイン獲得！
❤️ 最大HPが${hpReward}増えた！`
);


    // ラスボスを倒した場合
    if (stageData.isBoss) {

    setTimeout(() => {

        showTigerRescueScene();

    }, 1800);

    return;
}


    // 普通の動物に戻す
    setTimeout(() => {

        rescueAnimal();

    }, 7000);

}

// ===============================
// 動物を暗黒から救う
// ===============================
function rescueAnimal() {

    const stageData =
        stages[currentStage];

    const enemyImageElement =
        document.getElementById("enemyImage");


    if (enemyImageElement) {

        enemyImageElement.src =
            stageData.normalImage;

        enemyImageElement.alt =
            stageData.normalName;

        enemyImageElement.classList.add(
            "savedAnimal"
        );

    }


    const enemyNameElement =
        document.getElementById("enemyName");

    const battleEnemyNameElement =
        document.getElementById(
            "battleEnemyName"
        );


    if (enemyNameElement) {

        enemyNameElement.textContent =
            stageData.normalName;

    }

    if (battleEnemyNameElement) {

        battleEnemyNameElement.textContent =
            stageData.normalName;

    }


    showMessage(
        `${stageData.normalName}は暗黒の力から解放された！`
    );


    setTimeout(() => {

        showCompanionScene();

    }, 1500);

}


// ===============================
// 仲間になる場面
// ===============================
function showCompanionScene() {

    // ===============================
    // 勝利音を停止
    // ===============================
    const victorySound =
        document.getElementById(
            "victorySound"
        );

    if (victorySound) {

        victorySound.pause();

        victorySound.currentTime = 0;
    }

    // 仲間と歩くBGMへ変更
    playBgm("walkBgm");

    console.log("仲間シーン開始");
console.log("currentStage:", currentStage);
console.log("friend:", friendData[currentStage]);
    
    const friend = friendData[currentStage];

    if (!friend) {
        openShop();
        return;
    }

    const alreadyJoined =
        joinedFriends.some(
            joinedFriend =>
                joinedFriend.name === friend.name
        );

    if (!alreadyJoined) {
        joinedFriends.push(friend);
    }

    hideAllScreens();

    const companionScreen =
        document.getElementById("companionScene");

    if (!companionScreen) {
        console.error(
            "companionSceneがHTMLにありません"
        );
        openShop();
        return;
    }

    companionScreen.style.display = "block";

    console.log("companionScene表示");

    const companionTitle =
        document.getElementById("companionTitle");

    const companionMessage =
        document.getElementById("companionMessage");

    if (companionTitle) {
        companionTitle.textContent =
            "新しい仲間が加わった！";
    }

    if (companionMessage) {
        companionMessage.textContent =
            `${friend.name}が仲間になった！`;
    }

    updateWalkingFriends();

    const walkingParty =
        document.getElementById("walkingParty");

    if (walkingParty) {
        walkingParty.style.animation = "none";

        void walkingParty.offsetWidth;

        walkingParty.style.animation =
            "partyWalk 12s ease forwards";
    }
}


// ===============================
// 仲間一覧を表示
// ===============================
function updateWalkingFriends() {

    const walkingFriends =
        document.getElementById(
            "walkingFriends"
        );


    if (!walkingFriends) {
        return;
    }


    walkingFriends.innerHTML = "";


    joinedFriends.forEach(friend => {

        const image =
            document.createElement("img");

        image.src =
            friend.image;

        image.alt =
            friend.name;

        image.title =
            friend.name;

        image.className =
            "walking-friend";

        walkingFriends.appendChild(image);

    });

}

// ===============================
// ラスボス戦の仲間を表示する
// ===============================
function updateBossCompanionButtons() {

    const commandArea =
        document.getElementById(
            "bossCompanionCommands"
        );

    const partyArea =
        document.getElementById(
            "bossCompanionParty"
        );

    const buttonArea =
        document.getElementById(
            "bossCompanionButtons"
        );

    if (
        !commandArea ||
        !partyArea ||
        !buttonArea
    ) {
        return;
    }


    const stageData =
        stages[currentStage];


    // ラスボス戦以外は非表示
    if (
        !stageData ||
        !stageData.isBoss
    ) {

        commandArea.style.display =
            "none";

        partyArea.innerHTML = "";
        buttonArea.innerHTML = "";

        return;
    }


    commandArea.style.display =
        "block";

    partyArea.innerHTML = "";
    buttonArea.innerHTML = "";


    joinedFriends.forEach(
    (friend, index) => {

        const orderPosition =
            player.bossCompanionOrder.indexOf(index);

        const canAttack =
            orderPosition !== -1 &&
            orderPosition < player.bossCompanionLimit;


        // 仲間画像
        const image =
            document.createElement("img");

        image.src = friend.image;
        image.alt = friend.name;
        image.title = friend.name;

        image.id =
            `bossFriendImage${index}`;

        image.className =
            "boss-party-friend";

        if (!canAttack) {
            image.classList.add(
                "companion-unavailable"
            );
        }

        partyArea.appendChild(image);


        // 仲間攻撃ボタン
        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "companionAttackButton";

        button.dataset.friendIndex =
            index;

        if (canAttack) {

            button.textContent =
                `${friend.name}の追撃`;

            // トカゲが攻撃するまでは押せない
            button.disabled = true;

        } else {

            button.textContent =
                `${friend.name}は攻撃できない`;

            button.disabled = true;

            button.classList.add(
                "companion-unavailable-button"
            );
        }

        button.onclick = () => {

            if (!canAttack) {
                return;
            }

            companionAttack(index);
        };

        buttonArea.appendChild(button);
    }
);}


// ===============================
// ラスボス戦を開始
// ===============================
function startBossBattle() {

    // ===============================
    // ラスボス登場音を停止
    // ===============================
    const bossIntroSound =
        document.getElementById(
            "bossIntroSound"
        );

    if (bossIntroSound) {

        bossIntroSound.pause();

        bossIntroSound.currentTime = 0;
    }


    // ===============================
    // ラスボス戦BGMへ切り替え
    // ===============================
    playBgm("bossBattleBgm");



    hideAllScreens();

    const battleScreen =
        document.getElementById("battle");

    if (!battleScreen) {
        return;
    }

    battleScreen.style.display = "block";

    playerTurn = true;
    gameFinished = false;

    player.defending = false;
    player.barrierActive = false;
    player.rainbowBarrierTurns = 0;
    player.companionAttackDone = false;

    player.bossCompanionOrder =
        joinedFriends.map(
            (friend, index) => index
        );

    player.bossCompanionLimit =
        joinedFriends.length;

    // ラスボスステージを読み込む
loadStage();


// ===============================
// ラスボス開始時にHP完全回復
// ===============================
player.hp = player.maxHp;


// HP表示を確実に更新
requestAnimationFrame(() => {

    player.hp = player.maxHp;

    updateHP();

});

    updateBossCompanionButtons();
    enableCompanionButtons();

    enableButtons();
    updateBattleItemButtons();

    showMessage(
        "暗黒王ダークタイガーが現れた！"
    );
}


// ===============================
// 仲間ごとの必殺技
// ===============================
function getCompanionSkill(friendName) {

    const skills = {

        "うさぎ": {
            name: "ジャンプキック",
            damage: 60
        },

        "かめ": {
            name: "スピンアタック",
            damage: 70
        },

        "いぬ": {
            name: "ワイルドバイト",
            damage: 80
        },

        "ねこ": {
            name: "ネコパンチ",
            damage: 90
        },

        "さる": {
            name: "バナナラッシュ",
            damage: 100
        },

        "しか": {
            name: "ホーンクラッシュ",
            damage: 110
        },

        "いのしし": {
            name: "突進タックル",
            damage: 120
        },

        "ダチョウ": {
            name: "ハイスピードキック",
            damage: 130
        },

        "くま": {
            name: "ベアークロー",
            damage: 140
        },

        "ゴリラ": {
            name: "ギガパンチ",
            damage: 150
        },

        "ライオン": {
            name: "ライオンブレス",
            damage: 180
        },

        "バイソン": {
            name: "メガホーン",
            damage: 170
        },

        "キリン": {
            name: "ロングキック",
            damage: 185
        },

        "ぞう": {
            name: "ギガスタンプ",
            damage: 200
        }
    };


    return (
        skills[friendName] || {
            name: "なかまアタック",
            damage: 80
        }
    );
}

// ===============================
// トラの攻撃で仲間が2匹減る
// ===============================
function reduceBossCompanions() {

    // ラスボス戦以外は何もしない
    if (
        !stages[currentStage] ||
        !stages[currentStage].isBoss
    ) {
        return;
    }

    const beforeCount =
        player.bossCompanionLimit;

    if (beforeCount <= 0) {
        return;
    }

    // 2匹ずつ減らす
    let afterCount =
        beforeCount - 2;

    if (afterCount < 0) {
        afterCount = 0;
    }

    player.bossCompanionLimit =
        afterCount;

    updateBossCompanionButtons();

    if (afterCount > 0) {

        showMessage(
            `🐯 トラの強烈な攻撃！\n攻撃できる仲間はあと ${afterCount}匹！`
        );

    } else {

        showMessage(
            "🐯 仲間たちは全員戦えなくなった！\nここからはトカゲだけで戦う！"
        );
    }
}

// ===============================
// 仲間が追撃する
// ===============================
function companionAttack(index) {

    if (
        !playerTurn ||
        gameFinished
    ) {
        return;
    }


    const stageData =
        stages[currentStage];


    if (
        !stageData ||
        !stageData.isBoss
    ) {
        return;
    }


    const friend =
        joinedFriends[index];


    if (!friend) {
        return;
    }


    const skill =
        getCompanionSkill(
            friend.name
        );


    playerTurn = false;

    disableButtons();
    disableCompanionButtons();


    const friendImage =
        document.getElementById(
            `bossFriendImage${index}`
        );

    const skillEffect =
        document.getElementById(
            "companionSkillEffect"
        );


    // 選ばれた仲間を光らせる
    if (friendImage) {

        friendImage.classList.add(
            "selected",
            "companion-jump-attack"
        );
    }


    // 技名を表示
    if (skillEffect) {

        skillEffect.textContent =
            `${friend.name}の${skill.name}！！`;

        skillEffect.classList.remove(
            "show"
        );

        void skillEffect.offsetWidth;

        skillEffect.classList.add(
            "show"
        );
    }


    showMessage(
        `🤝 ${friend.name}が前へ飛び出した！`
    );


    // 攻撃が当たるタイミング
    setTimeout(() => {

        enemy.hp = Math.max(
            0,
            enemy.hp - skill.damage
        );

        updateHP();

        showDamage(
            skill.damage
        );

        showMessage(
            `${friend.name}の${skill.name}！` +
            `${skill.damage}ダメージ！`
        );

    }, 550);


    // 演出を消す
    setTimeout(() => {

        if (friendImage) {

            friendImage.classList.remove(
                "selected",
                "companion-jump-attack"
            );
        }

        if (skillEffect) {

            skillEffect.classList.remove(
                "show"
            );
        }

    }, 1150);


    // 撃破判定
    setTimeout(() => {

        if (enemy.hp <= 0) {

            victory();

            return;
        }


        // 仲間の追撃後は敵のターン
        enemyAttack();

    }, 1350);
}

// ===============================
// 仲間攻撃ボタンを無効化
// ===============================
function disableCompanionButtons() {

    const buttons =
        document.querySelectorAll(
            ".companionAttackButton"
        );

    buttons.forEach(button => {

        button.disabled = true;

    });
}


// ===============================
// 攻撃できる仲間ボタンだけ有効化
// ===============================
function enableCompanionButtons() {

    const stageData =
        stages[currentStage];

    if (
        !stageData ||
        !stageData.isBoss ||
        gameFinished
    ) {
        return;
    }

    const buttons =
        document.querySelectorAll(
            ".companionAttackButton"
        );

    buttons.forEach(button => {

        const friendIndex =
            Number(
                button.dataset.friendIndex
            );

        const orderPosition =
            player.bossCompanionOrder.indexOf(
                friendIndex
            );

        const canAttack =
            orderPosition !== -1 &&
            orderPosition <
                player.bossCompanionLimit;

        button.disabled =
            !canAttack;
    });
}

// ===============================
// 仲間画面からショップへ進む
// ===============================
function goToShop() {
    openShop();
}

function goToShopFromCompanionScene() {
    openShop();
}

// ===============================
// ショップを開く
// ===============================
function openShop() {

     // 勝利音が残っていたら停止
    const victorySound =
        document.getElementById(
            "victorySound"
        );

    if (victorySound) {

        victorySound.pause();

        victorySound.currentTime = 0;
    }

    // ショップBGMへ変更
    playBgm("shopBgm");

    hideAllScreens();


    const shopScreen =
        document.getElementById("shop");

    if (shopScreen) {

        shopScreen.style.display =
            "block";

    }


    updateCoin();
    updateInventory();
    updateShopButtons();

}


// ===============================
// 商品を購入
// ===============================
// ===============================
// 商品を購入
// ===============================
function buyItem(itemName) {

    let price = 0;
    let displayName = "";


    // -------------------------------
    // 価格と購入済み判定
    // -------------------------------

    if (itemName === "banana") {
        price = 50;
        displayName = "バナナチップス";
    }

    else if (itemName === "healFruit") {

    price = 150;
    displayName = "回復の実";

}

    else if (itemName === "fruit") {
        price = 80;
        displayName = "生命の木の実";
    }

    else if (itemName === "specialFruit") {
        price = 100;
        displayName = "必殺の実";
    }

    else if (itemName === "barrierFruit") {
        price = 120;
        displayName = "バリアの実";
    }

    else if (itemName === "rainbowBarrier") {

    price = 300;
    displayName = "レインボーバリア";

}

    else if (itemName === "helmet") {

        if (player.hasHelmet) {
            showShopMessage(
                "葉っぱヘルメットは購入済みだよ！"
            );
            return;
        }

        price = 100;
        displayName = "葉っぱヘルメット";
    }

    else if (itemName === "stick") {

        if (player.hasStick) {
            showShopMessage(
                "木の棒は購入済みだよ！"
            );
            return;
        }

        price = 50;
        displayName = "木の棒";
    }

    else if (itemName === "sword") {

        if (player.hasSword) {
            showShopMessage(
                "木の剣は購入済みだよ！"
            );
            return;
        }

        price = 150;
        displayName = "木の剣";
    }

    else if (itemName === "steelSword") {

        if (player.hasSteelSword) {
            showShopMessage(
                "鋼の剣は購入済みだよ！"
            );
            return;
        }

        price = 200;
        displayName = "鋼の剣";
    }

    else if (itemName === "steelHelmet") {

        if (player.hasSteelHelmet) {
            showShopMessage(
                "鋼のヘルメットは購入済みだよ！"
            );
            return;
        }

        price = 250;
        displayName = "鋼のヘルメット";
    }

    else {
        showShopMessage(
            "その商品は見つからなかったよ。"
        );
        return;
    }


    // -------------------------------
    // コイン不足
    // -------------------------------

    if (player.coins < price) {
        showShopMessage(
            `コインが足りないよ！あと${price - player.coins}コイン必要だよ。`
        );
        return;
    }


    // コインを支払う
    player.coins -= price;


    // -------------------------------
    // 購入効果
    // -------------------------------

    if (itemName === "banana") {
        inventory.bananaChips += 1;
    }

    else if (itemName === "healFruit") {

    inventory.healFruit += 1;

}

    else if (itemName === "fruit") {
        inventory.fruit += 1;

        player.maxHp += 20;
        player.hp += 20;
    }

    else if (itemName === "specialFruit") {
        inventory.specialFruit += 1;
    }

    else if (itemName === "barrierFruit") {
        inventory.barrierFruit += 1;
    }

    else if (itemName === "rainbowBarrier") {

    inventory.rainbowBarrier += 1;

}

    else if (itemName === "helmet") {
        inventory.leafHelmet = 1;
        player.hasHelmet = true;

        player.maxHp += 50;
        player.hp += 50;
    }

    else if (itemName === "stick") {
        inventory.woodenStick = 1;
        player.hasStick = true;

        player.attackBonus = Math.max(
            player.attackBonus,
            5
        );
    }

    else if (itemName === "sword") {
        inventory.woodenSword = 1;
        player.hasSword = true;

        player.attackBonus = Math.max(
            player.attackBonus,
            40
        );
    }

    else if (itemName === "steelSword") {
        inventory.steelSword = 1;
        player.hasSteelSword = true;

        // 鋼の剣へ持ち替える
        player.attackBonus = 80;
    }

    else if (itemName === "steelHelmet") {
        inventory.steelHelmet = 1;
        player.hasSteelHelmet = true;

        player.maxHp += 150;
        player.hp += 150;
    }


    // -------------------------------
    // 画面更新
    // -------------------------------

    updateCoin();
updateInventory();
updateShopButtons();
updateEquipmentDisplay();
updateBattleItemButtons();
updateHP();

showShopMessage(
    `${displayName}を購入した！`
);
}

// ===============================
// ショップメッセージ
// ===============================
function showShopMessage(message) {

    const shopMessage =
        document.getElementById(
            "shopMessage"
        );


    if (shopMessage) {

        shopMessage.textContent =
            message;

    }

}


// ===============================
// ショップのボタン更新
// ===============================
function updateShopButtons() {

    const helmetButton =
        document.getElementById("helmetButton");

    const stickButton =
        document.getElementById("stickButton");

    const swordButton =
        document.getElementById("swordButton");

    const steelSwordButton =
        document.getElementById("steelSwordButton");

    const steelHelmetButton =
        document.getElementById("steelHelmetButton");


    if (helmetButton) {
        helmetButton.disabled =
            player.hasHelmet;

        helmetButton.textContent =
            player.hasHelmet
                ? "購入済み"
                : "購入する";
    }

    if (stickButton) {
        stickButton.disabled =
            player.hasStick;

        stickButton.textContent =
            player.hasStick
                ? "購入済み"
                : "購入する";
    }

    if (swordButton) {
        swordButton.disabled =
            player.hasSword;

        swordButton.textContent =
            player.hasSword
                ? "購入済み"
                : "購入する";
    }

    if (steelSwordButton) {
        steelSwordButton.disabled =
            player.hasSteelSword;

        steelSwordButton.textContent =
            player.hasSteelSword
                ? "購入済み"
                : "購入する";
    }

    if (steelHelmetButton) {
        steelHelmetButton.disabled =
            player.hasSteelHelmet;

        steelHelmetButton.textContent =
            player.hasSteelHelmet
                ? "購入済み"
                : "購入する";
    }
}

// ===============================
// バトル中のアイテムボタンを更新
// ===============================
function updateBattleItemButtons() {

    const bananaButton =
        document.getElementById("bananaButton");

    const healFruitButton =
        document.getElementById("healFruitButton");

    const specialFruitButton =
        document.getElementById("specialFruitButton");

    const barrierFruitButton =
        document.getElementById("barrierFruitButton");

    const rainbowBarrierButton =
        document.getElementById("rainbowBarrierButton");

    const itemMenu =
        document.getElementById("itemMenu");


    // バナナチップス
    updateBattleItemButton(
        bananaButton,
        inventory.bananaChips,
        `🍌 バナナチップス`
    );


    // 回復の実
    updateBattleItemButton(
        healFruitButton,
        inventory.healFruit,
        `💚 回復の実`
    );


    // 必殺の実
    updateBattleItemButton(
        specialFruitButton,
        inventory.specialFruit,
        `🔥 必殺の実`
    );


    // バリアの実
    updateBattleItemButton(
        barrierFruitButton,
        inventory.barrierFruit,
        `🛡️ バリアの実`
    );


    // レインボーバリア
    updateBattleItemButton(
        rainbowBarrierButton,
        inventory.rainbowBarrier,
        `🌈 レインボーバリア`
    );


    // 1個でも持っているアイテムがあるか確認
    const hasBattleItem =
        inventory.bananaChips > 0 ||
        inventory.healFruit > 0 ||
        inventory.specialFruit > 0 ||
        inventory.barrierFruit > 0 ||
        inventory.rainbowBarrier > 0;


    // 何も持っていない時は緑の枠ごと消す
    if (itemMenu) {

        itemMenu.style.display =
            hasBattleItem
                ? "grid"
                : "none";
    }
}


// ===============================
// アイテムボタン1個を更新
// ===============================
function updateBattleItemButton(
    button,
    itemCount,
    itemName
) {

    if (!button) {
        return;
    }


    if (itemCount > 0) {

        button.style.display =
            "block";

        button.textContent =
            `${itemName} × ${itemCount}`;

        button.disabled =
            !playerTurn || gameFinished;

    } else {

        button.style.display =
            "none";

        button.disabled =
            true;
    }
}


// ===============================
// 所持アイテム表示を更新
// ===============================
function updateInventory() {

    const bananaCount =
        document.getElementById("bananaCount");

    const healFruitCount =
        document.getElementById("healFruitCount");

    const fruitCount =
        document.getElementById("fruitCount");

    const specialFruitCount =
        document.getElementById("specialFruitCount");

    const barrierFruitCount =
        document.getElementById("barrierFruitCount");

    const rainbowBarrierCount =
        document.getElementById("rainbowBarrierCount");

    const stickCount =
        document.getElementById("stickCount");

    const helmetCount =
        document.getElementById("helmetCount");

    const swordCount =
        document.getElementById("swordCount");

    const steelSwordCount =
        document.getElementById("steelSwordCount");

    const steelHelmetCount =
        document.getElementById("steelHelmetCount");


    if (bananaCount) {
        bananaCount.textContent =
            inventory.bananaChips;
    }

    if (healFruitCount) {
        healFruitCount.textContent =
            inventory.healFruit;
    }

    if (fruitCount) {
        fruitCount.textContent =
            inventory.fruit;
    }

    if (specialFruitCount) {
        specialFruitCount.textContent =
            inventory.specialFruit;
    }

    if (barrierFruitCount) {
        barrierFruitCount.textContent =
            inventory.barrierFruit;
    }

    if (rainbowBarrierCount) {
        rainbowBarrierCount.textContent =
            inventory.rainbowBarrier;
    }

    if (stickCount) {
        stickCount.textContent =
            inventory.woodenStick;
    }

    if (helmetCount) {
        helmetCount.textContent =
            inventory.leafHelmet;
    }

    if (swordCount) {
        swordCount.textContent =
            inventory.woodenSword;
    }

    if (steelSwordCount) {
        steelSwordCount.textContent =
            inventory.steelSword;
    }

    if (steelHelmetCount) {
        steelHelmetCount.textContent =
            inventory.steelHelmet;
    }
}


// ===============================
// 持ち物画面を開く
// ===============================
function openInventory() {

    hideAllScreens();

    const inventoryScreen =
        document.getElementById("inventory");

    if (inventoryScreen) {
        inventoryScreen.style.display = "block";
    }

    updateInventory();
}


// ===============================
// 持ち物画面を閉じる
// ===============================
function closeInventory() {

    const inventoryScreen =
        document.getElementById(
            "inventory"
        );


    if (inventoryScreen) {

        inventoryScreen.style.display =
            "none";

    }

}


// ===============================
// バナナチップスを使う
// ===============================
function useBananaChips() {

    if (
        !playerTurn ||
        gameFinished
    ) {
        return;
    }

    // 🍌 バナナチップス効果音
playSound("bananaSound");


    if (inventory.bananaChips <= 0) {

        showMessage(
            "バナナチップスを持っていない！"
        );

        return;

    }


    if (player.hp >= player.maxHp) {

        showMessage(
            "HPはすでに満タンだ！"
        );

        return;

    }


    playerTurn = false;

    disableButtons();


    inventory.bananaChips -= 1;


    const healAmount = 40;


    player.hp += healAmount;


    if (player.hp > player.maxHp) {

        player.hp =
            player.maxHp;

    }


    updateHP();
    updateInventory();
    updateBattleItemButtons();
    closeInventory();


    showMessage(
        `バナナチップスを食べて、HPが${healAmount}回復した！`
    );


    // アイテム使用後も自分のターン
playerTurn = true;

enableButtons();

updateBattleItemButtons();

showMessage(
    "🍌 HPを回復した！攻撃を選ぼう！"
);

}

// ===============================
// 回復の実を使う
// ===============================
function useHealFruit() {

    if (!playerTurn || gameFinished) {
        return;
    }

    if (inventory.healFruit <= 0) {

        showMessage(
            "回復の実を持っていない！"
        );

        return;
    }

    if (player.hp >= player.maxHp) {

        showMessage(
            "HPはすでに満タンだ！"
        );

        return;
    }

playSound("healFruitSound");

    playerTurn = false;
    disableButtons();

    inventory.healFruit -= 1;

    const beforeHp = player.hp;
    const healAmount = 100;

    player.hp = Math.min(
        player.maxHp,
        player.hp + healAmount
    );

    const actualHeal =
        player.hp - beforeHp;

    updateHP();
    updateInventory();
    updateBattleItemButtons();

    showMessage(
        `💖 回復の実を使った！HPが${actualHeal}回復した！`
    );

    playerTurn = true;

enableButtons();

updateBattleItemButtons();

showMessage(
    "💚 HPが回復した！攻撃を選ぼう！"
);
}

// ------------------------------
// 必殺の実
// ------------------------------
function useSpecialFruit() {

    if (!playerTurn || gameFinished) {
        return;
    }

    if (inventory.specialFruit <= 0) {

        showMessage("必殺の実を持っていない！");

        return;
    }

    // ★ 必殺の実の効果音
playSound("specialFruitSound");

    playerTurn = false;

    disableButtons();

    inventory.specialFruit--;

    // ゲーム後半は威力アップ
let damage = 150;

// ステージが半分以上なら250ダメージ
if (currentStage >= Math.floor(stages.length / 2)) {
    damage = 250;
}

enemy.hp = Math.max(0, enemy.hp - damage);



    updateHP();
    updateInventory();
    updateBattleItemButtons();

    showDamage(damage);

    showMessage(`🔥 必殺の実！敵に${damage}ダメージ！`);

    if (enemy.hp <= 0) {

        setTimeout(() => {

            victory();

        }, 700);

        return;
    }

    // 必殺の実を使ったあとも自分のターン
playerTurn = true;

enableButtons();

updateBattleItemButtons();

showMessage(
    `🔥 必殺の実で${damage}ダメージ！続けて攻撃を選ぼう！`
);

}

// ------------------------------
// バリアの実
// ------------------------------
function useBarrierFruit() {

    if (!playerTurn || gameFinished) {
        return;
    }

    if (inventory.barrierFruit <= 0) {

        showMessage("バリアの実を持っていない！");

        return;
    }

    playSound("barrierSound");

    playerTurn = false;

    disableButtons();

    inventory.barrierFruit--;

    player.barrierActive = true;

    updateInventory();
    updateBattleItemButtons();

    showMessage("🛡️ バリアの実を使った！次の攻撃を防ぐ！");

    playerTurn = true;

enableButtons();

updateBattleItemButtons();

showMessage(
    "🛡️ バリアを張った！攻撃を選ぼう！"
);

}

// ===============================
// レインボーバリアを使う
// ===============================
function useRainbowBarrier() {

    if (!playerTurn || gameFinished) {
        return;
    }

    if (inventory.rainbowBarrier <= 0) {

        showMessage(
            "レインボーバリアを持っていない！"
        );

        return;
    }

    // 効果中の重ねがけは禁止
    if (player.rainbowBarrierTurns > 0) {

        showMessage(
            "レインボーバリアはすでに発動中だ！"
        );

        return;
    }

    playSound("rainbowBarrierSound");

    inventory.rainbowBarrier -= 1;

    // 敵の攻撃を2回休ませる
    player.rainbowBarrierTurns = 2;

    updateInventory();
    updateBattleItemButtons();

    // 使用後もそのまま攻撃できる
    playerTurn = true;
    enableButtons();

    showMessage(
        "🌈 レインボーバリア発動！敵は次の攻撃を2回休む！"
    );
}


// ===============================
// バナナボタンの状態を更新
// ===============================
// ===============================
// バトル中のアイテムボタンを更新
// ===============================
function updateBattleItemButtons() {

    const bananaButton =
        document.getElementById("bananaButton");

    const healFruitButton =
        document.getElementById("healFruitButton");

    const specialFruitButton =
        document.getElementById("specialFruitButton");

    const barrierFruitButton =
        document.getElementById("barrierFruitButton");

    const rainbowBarrierButton =
        document.getElementById("rainbowBarrierButton");


    updateItemButton(
        bananaButton,
        inventory.bananaChips,
        `🍌 バナナチップス`
    );

    updateItemButton(
        healFruitButton,
        inventory.healFruit,
        `💚 回復の実`
    );

    updateItemButton(
        specialFruitButton,
        inventory.specialFruit,
        `🔥 必殺の実`
    );

    updateItemButton(
        barrierFruitButton,
        inventory.barrierFruit,
        `🛡️ バリアの実`
    );

    updateItemButton(
        rainbowBarrierButton,
        inventory.rainbowBarrier,
        `🌈 レインボーバリア`
    );
// ===============================
// アイテムを1つも持っていない時は
// アイテム欄を非表示
// ===============================
const itemMenu =
    document.getElementById("itemMenu");

if (itemMenu) {

    const hasItem =
        inventory.bananaChips > 0 ||
        inventory.healFruit > 0 ||
        inventory.specialFruit > 0 ||
        inventory.barrierFruit > 0 ||
        inventory.rainbowBarrier > 0;

    itemMenu.style.display =
        hasItem ? "grid" : "none";
}

}


// ===============================
// アイテムボタン1個を更新
// ===============================
function updateItemButton(
    button,
    itemCount,
    itemName
) {

    if (!button) {
        return;
    }

    if (itemCount > 0) {

        button.style.display = "inline-flex";

        button.textContent =
            `${itemName} × ${itemCount}`;

        button.disabled =
            !playerTurn || gameFinished;

    } else {

        button.style.display = "none";

        button.disabled = true;
    }
}

// ===============================
// 装備画像を表示
// ===============================
 function updateEquipmentDisplay() {

    const helmetImage =
        document.getElementById("equippedHelmet");

    const steelHelmet =
        document.getElementById("equippedSteelHelmet");

    const stickImage =
        document.getElementById("equippedStick");

    const swordImage =
        document.getElementById("equippedSword");

    const steelSword =
        document.getElementById("equippedSteelSword");


    // ===============================
    // ヘルメット
    // 鋼を持っている時は葉っぱを隠す
    // ===============================

    if (helmetImage) {
        helmetImage.style.display =
            player.hasHelmet && !player.hasSteelHelmet
                ? "block"
                : "none";
    }

    if (steelHelmet) {
        steelHelmet.style.display =
            player.hasSteelHelmet
                ? "block"
                : "none";
    }


    // ===============================
    // 武器
    // 一番強い武器だけ表示
    // ===============================

    if (stickImage) {
        stickImage.style.display =
            player.hasStick &&
            !player.hasSword &&
            !player.hasSteelSword
                ? "block"
                : "none";
    }

    if (swordImage) {
        swordImage.style.display =
            player.hasSword &&
            !player.hasSteelSword
                ? "block"
                : "none";
    }

    if (steelSword) {
        steelSword.style.display =
            player.hasSteelSword
                ? "block"
                : "none";
    }
}


// ===============================
// 次のステージへ
// ===============================
function nextStage() {

    // ステージクリアで全回復
    player.hp =
        player.maxHp;

    player.defending = false;


    currentStage += 1;


    // ラスボス前
    if (
        stages[currentStage] &&
        stages[currentStage].isBoss
    ) {

        showBossIntro();

        return;

    }


    if (currentStage < stages.length) {

    showEnemyIntro();

}

    else {

        showEnding();

    }

}


// ===============================
// ラスボス登場画面
// ===============================
function showBossIntro() {

    // 通常BGMを止める
    stopBgm();

    // ラスボス登場音
    playSound("bossIntroSound");

    hideAllScreens();


    const bossIntro =
        document.getElementById(
            "bossIntro"
        );


    if (!bossIntro) {

        startBossBattle();

        return;

    }


    bossIntro.style.display =
        "block";


    const bossIntroImage =
        document.getElementById(
            "bossIntroImage"
        );

    const bossIntroMessage =
        document.getElementById(
            "bossIntroMessage"
        );


    if (bossIntroImage) {

        bossIntroImage.src =
            stages[currentStage].darkImage;

        bossIntroImage.alt =
            stages[currentStage].name;

    }


    if (bossIntroMessage) {

        bossIntroMessage.textContent =
            "すべての暗黒の力を操る、暗黒王ダークタイガーが現れた！";

    }

}

// ===============================
// ラスボス戦のルール説明
// ===============================
function showBossRuleScene() {



    hideAllScreens();


    const ruleScene =
        document.getElementById(
            "bossRuleScene"
        );

    if (ruleScene) {

        ruleScene.style.display =
            "block";

            // ===============================
// ラスボス説明画面に仲間を表示
// ===============================
const friendsArea =
    document.getElementById(
        "bossRuleFriends"
    );

if (friendsArea) {

    friendsArea.innerHTML = "";


    joinedFriends.forEach(friend => {

        const image =
            document.createElement("img");

        image.src =
            friend.image;

        image.alt =
            friend.name;

        image.title =
            friend.name;

        friendsArea.appendChild(
            image
        );
    });
}


    }
}


// ===============================
// ラスボス戦を開始
// ===============================
function startBossBattle() {

    // ラスボス登場音を止める
    const bossIntroSound =
        document.getElementById(
            "bossIntroSound"
        );

    if (bossIntroSound) {
        bossIntroSound.pause();
        bossIntroSound.currentTime = 0;
    }


    // ラスボス専用BGM
    playBgm("bossBattleBgm");


    hideAllScreens();


    const battleScreen =
        document.getElementById(
            "battle"
        );

    if (!battleScreen) {
        return;
    }


    battleScreen.style.display =
        "block";


    // -------------------------------
    // ラスボス戦の状態を初期化
    // -------------------------------
    playerTurn = true;
    gameFinished = false;

    player.defending = false;
    player.barrierActive = false;
    player.rainbowBarrierTurns = 0;
    player.companionAttackDone = false;


    // -------------------------------
    // 最初は仲間全員が攻撃可能
    // -------------------------------
    player.bossCompanionOrder =
        joinedFriends.map(
            (friend, index) => index
        );

    player.bossCompanionLimit =
        joinedFriends.length;


    // -------------------------------
    // ラスボスステージ読み込み
    // -------------------------------
    loadStage();


    // ===============================
    // ★ ラスボス開始時に完全回復
    // ===============================
    player.hp =
        player.maxHp;

    updateHP();


    // 仲間の画像・ボタンを作る
    updateBossCompanionButtons();

    enableCompanionButtons();


    // トカゲの技
    enableButtons();

    updateBattleItemButtons();

    updateEquipmentDisplay();


    showMessage(
        "暗黒王ダークタイガーが現れた！トカゲの技か仲間の攻撃を選ぼう！"
    );
}

// ===============================
// 暗黒トラが元に戻るラスト演出
// ===============================
function showTigerRescueScene() {

    hideAllScreens();

    const scene =
        document.getElementById(
            "tigerRescueScene"
        );

    const title =
        document.getElementById(
            "tigerRescueTitle"
        );

    const message =
        document.getElementById(
            "tigerRescueMessage"
        );

    const darkTiger =
        document.getElementById(
            "endingDarkTiger"
        );

    const normalTiger =
        document.getElementById(
            "endingNormalTiger"
        );

    const light =
        document.getElementById(
            "tigerEndingLight"
        );

    const dialogue =
        document.getElementById(
            "endingDialogue"
        );

    const speakerImage =
        document.getElementById(
            "endingSpeakerImage"
        );

    const dialogueText =
        document.getElementById(
            "endingDialogueText"
        );

    const friendsArea =
        document.getElementById(
            "rescueEndingFriends"
        );


    if (!scene) {
        showEnding();
        return;
    }


    scene.style.display = "block";


    // -------------------------------
    // 初期状態
    // -------------------------------
    if (title) {
        title.textContent =
            "暗黒王ダークタイガーを倒した！";
    }

    if (message) {
        message.textContent =
            "暗黒の力が消えていく……";
    }

    if (darkTiger) {
        darkTiger.style.display = "block";

        darkTiger.classList.remove(
            "dark-tiger-fade"
        );
    }

    if (normalTiger) {
        normalTiger.style.display = "none";

        normalTiger.classList.remove(
            "normal-tiger-appear"
        );
    }

    if (light) {
        light.classList.remove(
            "ending-light-active"
        );
    }

    if (dialogue) {
        dialogue.style.display = "none";
    }

    if (friendsArea) {
        friendsArea.innerHTML = "";
        friendsArea.style.display = "none";
    }


    // -------------------------------
    // Scene1：暗黒の力が消える
    // -------------------------------
    setTimeout(() => {

        if (title) {
            title.textContent =
                "暗黒の力が消えていく……";
        }

        if (light) {
            light.classList.add(
                "ending-light-active"
            );
        }

        if (darkTiger) {
            darkTiger.classList.add(
                "dark-tiger-fade"
            );
        }

        if (message) {
            message.textContent =
                "まばゆい光がダークタイガーを包んだ！";
        }

    }, 1800);


    // -------------------------------
    // Scene2：普通のトラへ戻る
    // -------------------------------
    setTimeout(() => {

        if (darkTiger) {
            darkTiger.style.display =
                "none";
        }

        if (normalTiger) {
            normalTiger.style.display =
                "block";

            void normalTiger.offsetWidth;

            normalTiger.classList.add(
                "normal-tiger-appear"
            );
        }

        if (title) {
            title.textContent =
                "トラは元の姿に戻った！";
        }

        if (message) {
            message.textContent =
                "暗黒の力から解放された！";
        }

    }, 5200);


    // -------------------------------
    // Scene3：トラの会話
    // -------------------------------
    setTimeout(() => {

        if (dialogue) {
            dialogue.style.display =
                "flex";
        }

        if (speakerImage) {
            speakerImage.src =
                "images/tiger.png";

            speakerImage.alt =
                "トラ";
        }

        if (dialogueText) {
            dialogueText.textContent =
                "トラ「私は……今まで何をしていたんだ……」";
        }

    }, 7600);


    setTimeout(() => {

        if (dialogueText) {
            dialogueText.textContent =
                "トラ「ごめん……そして、助けてくれてありがとう。」";
        }

    }, 10000);


    // -------------------------------
    // Scene4：トカゲが返事
    // -------------------------------
    setTimeout(() => {

        if (speakerImage) {
            speakerImage.src =
                "images/lizard.png";

            speakerImage.alt =
                "主人公トカゲ";
        }

        if (dialogueText) {
            dialogueText.textContent =
                "トカゲ「もう大丈夫！これからは一緒に森を守ろう！」";
        }

    }, 12600);


    // -------------------------------
    // Scene5：仲間全員集合
    // -------------------------------
    setTimeout(() => {

        if (title) {
            title.textContent =
                "仲間たちが集まってきた！";
        }

        if (dialogue) {
            dialogue.style.display =
                "none";
        }

        if (message) {
            message.textContent =
                "森に光と平和が戻った！";
        }

        showRescueEndingFriends();

    }, 15200);


    // -------------------------------
    // 今のエンディング画面へ
    // -------------------------------
    setTimeout(() => {

        showEnding();

    }, 19500);
}


// ===============================
// ラスト演出で仲間全員を表示
// ===============================
function showRescueEndingFriends() {

    const friendsArea =
        document.getElementById(
            "rescueEndingFriends"
        );

    if (!friendsArea) {
        return;
    }

    friendsArea.innerHTML = "";
    friendsArea.style.display = "flex";


    // 主人公トカゲ
    const lizardImage =
        document.createElement("img");

    lizardImage.src =
        "images/lizard.png";

    lizardImage.alt =
        "主人公トカゲ";

    lizardImage.className =
        "rescue-ending-character";

    friendsArea.appendChild(
        lizardImage
    );


    // 助けた仲間全員
    joinedFriends.forEach(friend => {

        const image =
            document.createElement("img");

        image.src =
            friend.image;

        image.alt =
            friend.name;

        image.title =
            friend.name;

        image.className =
            "rescue-ending-character";

        friendsArea.appendChild(
            image
        );
    });


    // 元に戻ったトラ
    const tigerImage =
        document.createElement("img");

    tigerImage.src =
        "images/tiger.png";

    tigerImage.alt =
        "仲間になったトラ";

    tigerImage.className =
        "rescue-ending-character rescue-ending-tiger";

    friendsArea.appendChild(
        tigerImage
    );
}

// ===============================
// エンディングを表示
// ===============================
function showEnding() {

    hideAllScreens();

    const endingScreen =
        document.getElementById("ending");

    const endingMessage =
        document.getElementById("endingMessage");

    const endingFriends =
        document.getElementById("endingFriends");


    if (!endingScreen) {
        return;
    }

    endingScreen.style.display = "block";


    if (endingMessage) {

        endingMessage.textContent =
            "暗黒王ダークタイガーを倒した！森に光と平和が戻った！";
    }


    if (!endingFriends) {
        return;
    }


    endingFriends.innerHTML = "";


    // -------------------------------
    // 主人公トカゲ
    // -------------------------------
    const lizardCard =
        document.createElement("div");

    lizardCard.className =
        "ending-character";

    lizardCard.innerHTML = `
        <img
            src="images/lizard.png"
            alt="主人公トカゲ"
        >
        <p>トカゲ</p>
    `;

    endingFriends.appendChild(
        lizardCard
    );


    // -------------------------------
    // 助けた仲間全員
    // -------------------------------
    joinedFriends.forEach(friend => {

        const friendCard =
            document.createElement("div");

        friendCard.className =
            "ending-character";

        friendCard.innerHTML = `
            <img
                src="${friend.image}"
                alt="${friend.name}"
            >
            <p>${friend.name}</p>
        `;

        endingFriends.appendChild(
            friendCard
        );
    });


    // -------------------------------
    // 元に戻ったトラも仲間に追加
    // -------------------------------
    const tigerCard =
        document.createElement("div");

    tigerCard.className =
        "ending-character ending-tiger-card";

    tigerCard.innerHTML = `
        <img
            src="images/tiger.png"
            alt="トラ"
        >
        <p>トラ</p>
    `;

    endingFriends.appendChild(
        tigerCard
    );
}


// ===============================
// 最初からやり直す
// ===============================
function restartGame() {

    currentStage = 0;
    playerTurn = true;
    gameFinished = false;


    player.hp = 100;
    player.maxHp = 100;
    player.coins = 0;
    player.defending = false;
    player.barrierActive = false;
    player.rainbowBarrierTurns = 0;
    player.attackBonus = 0;
    player.hasHelmet = false;
    player.hasStick = false;
    player.hasSword = false;
    player.hasSteelSword = false;
player.hasSteelHelmet = false;


    inventory.bananaChips = 0;
    inventory.healFruit = 0;
    inventory.lifeFruit = 0;
    inventory.rainbowBarrier = 0;
    inventory.leafHelmet = 0;
    inventory.woodenStick = 0;
    inventory.woodenSword = 0;
inventory.steelSword = 0;
inventory.steelHelmet = 0;


    joinedFriends.length = 0;


    enemy.name =
        stages[0].name;

    enemy.hp =
        stages[0].hp;

    enemy.maxHp =
        stages[0].hp;

    enemy.image =
        stages[0].darkImage;


    updateCoin();
    updateInventory();
    updateEquipmentDisplay();
    updateWalkingFriends();
    console.log("仲間一覧更新完了");


    hideAllScreens();


    const titleScreen =
        document.getElementById(
            "title"
        );


    if (titleScreen) {

        titleScreen.style.display =
            "block";

    }

}


// ===============================
// ゲームオーバー
// ===============================
function gameOver() {

     // バトルBGMを停止
    stopBgm();

    // ゲームオーバー音
    playSound("gameOverSound");

    gameFinished = true;

    disableButtons();


    showMessage(
        "トカゲは力尽きた……。もう一度挑戦しよう！"
    );


    const retryButton =
        document.getElementById(
            "retryButton"
        );


    if (retryButton) {

        retryButton.style.display =
            "inline-block";

    }

}


// ===============================
// 現在のステージをやり直す
// ===============================
function retryStage() {

    gameFinished = false;
    playerTurn = true;

    player.hp =
        player.maxHp;

    player.defending = false;


    const retryButton =
        document.getElementById(
            "retryButton"
        );


    if (retryButton) {

        retryButton.style.display =
            "none";

    }


    loadStage();
    updateHP();
    enableButtons();

}



// ===============================
// バトルボタンを無効にする
// ===============================
function disableButtons() {

    const buttons =
        document.querySelectorAll("#battle .menu button");

    buttons.forEach(button => {
        button.disabled = true;
    });
}


// ===============================
// バトルボタンを有効にする
// ===============================
function enableButtons() {

    // トカゲの技ボタンだけ有効にする
    const attackButtons =
        document.querySelectorAll(
            "#battle .attackMenu button"
        );

    attackButtons.forEach(button => {

        button.disabled = false;

    });


    // 所持アイテムの表示と状態を更新
    updateBattleItemButtons();
}



// ===============================
// ダメージ演出
// ===============================
function showDamage(damage) {

    const enemyImage =
        document.getElementById(
            "enemyImage"
        );


    if (!enemyImage) {
        return;
    }


    enemyImage.classList.remove(
        "damage"
    );


    // 同じアニメーションをもう一度動かす
    void enemyImage.offsetWidth;


    enemyImage.classList.add(
        "damage"
    );


    setTimeout(() => {

        enemyImage.classList.remove(
            "damage"
        );

    }, 500);

}


// ===============================
// 指定範囲の乱数
// ===============================
function randomNumber(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


// ===============================
// ページを開いたときの初期設定
// ===============================
document.addEventListener(
    "DOMContentLoaded",
    () => {

        // 最初は全部の画面を隠す
        hideAllScreens();

        // タイトル画面だけ表示
        const titleScreen =
            document.getElementById("title");

        if (titleScreen) {
            titleScreen.style.display = "flex";
        }

        updateCoin();
        updateInventory();
        updateEquipmentDisplay();
        updateWalkingFriends();
        updateBattleItemButtons();


        const retryButton =
            document.getElementById(
                "retryButton"
            );


        if (retryButton) {

            retryButton.style.display =
                "none";

        }

    }
);





