const time = {};

time.working = () =>{
    let countTime = 0;
    let countMinute = 0;
    document.querySelectorAll('.c-main-table-body__row td:nth-of-type(4)').forEach(e => {
        let numberBox = e.textContent.trim().split(':');

        // 時間
        let getTime = parseInt(numberBox[0], 10);
        if (!Number.isNaN(getTime)) countTime += getTime;

        // 分
        let getMinute = parseInt(numberBox[1], 10);
        if (!Number.isNaN(getMinute)) countMinute += getMinute;
    });

    let conversionTime = parseInt(countMinute / 60, 10);
    for (let i = 0; i < conversionTime; i++) {
        countMinute -= 60;
    }

    return { countTime, countMinute, conversionTime};
};

time.status = () => {
    let workingDays = 0;
    const OPERATING_TIME = 8;
    const OPERATING_MINUTES = 0;
    document.querySelectorAll('.c-main-table-body__row td:nth-of-type(3)').forEach(e => {
        if (e.textContent.trim() !== '休日') workingDays++;
    });

    let a = workingDays * OPERATING_MINUTES;
    let conversionTimeB = parseInt(a / 60, 10);  //.5などを間引く。
    for (let i = 0; i < conversionTimeB; i++) {
        a -= 60;
    }

    return { workingDays, a, conversionTimeB, OPERATING_TIME };
};

const showTime = () => {
    const { countTime, countMinute, conversionTime} = time.working();
    const { workingDays, a, conversionTimeB, OPERATING_TIME } = time.status();

    console.log(`今月の勤怠日数は、${workingDays}日`);
    console.log(`現在の稼働時間は、${countTime + conversionTime}時間${countMinute}分`);
    console.log(`今月の必須稼働時間は、${workingDays * OPERATING_TIME + conversionTimeB}時間${a}分`);

    let checkMinute = a - countMinute;
    let checkTime = countTime + conversionTime
    if (Math.sign(a - countMinute) === -1) {
        checkTime -= 1;
        checkMinute += 60;
    }
    console.log(`必須稼働時間を満たすまで残り、${(workingDays * OPERATING_TIME + conversionTimeB) - checkTime}時間${checkMinute}分`);
};


// ----------------------------------------------------------
// 関数の実行（HTMLのパースが完了した直後に発火）
// ----------------------------------------------------------
window.addEventListener('load', () => {
    // ロード後に数秒置かないとDOMの値を取得できない。
    setTimeout(() => showTime(), 1000);
});