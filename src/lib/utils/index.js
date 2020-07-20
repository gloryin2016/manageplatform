const formateDate = ({
    time,
    success
}) => {
    var y = time.getFullYear();
    var m = time.getMonth() + 1; // 注意 JavaScript 月份+1
    var d = time.getDate();
    var h = time.getHours();
    var min = time.getMinutes();
    var s = time.getSeconds();
    let newDate = y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s;
    success({
        time: newDate
    })
}

export default {
    formateDate,
};