//构造对象，封装主体
function Game2048() {

}
//定义原型方法
Game2048.prototype= {
    //定义constructor的指向
    constructor:Game2048,
    //开始游戏
    gameStart: function () {
        frag++;
        if(frag>1)
        {
            alert("游戏已经开始");
        }
        else {
            var num1 = Math.floor(Math.random() * 16);
            var num2 = Math.floor(Math.random() * 16);
            //判断重复
            if (num1 != num2) {
                inFrame.eq(num1).html("2");
                inFrame.eq(num2).html("2");
            }
            else {
                return this.gameStart();
            }
            //给数字上色
            this.changeColor();
            //统计得分
            this.gameSore();
        }},
    //重置游戏
    gameReplace: function () {
        for (var i = 0; i < 16; i++) {
            inFrame.eq(i).html("");
        }
        frag = 0;
        this.changeColor();
        this.gameSore();
    },
    //渲染颜色
    changeColor: function () {
        for (var i = 0; i < 16; i++) {
            switch (inFrame.eq(i).html()) {
                case "2":
                    inFrame.eq(i).css("background", "#D2A47D");
                    break;
                case "4":
                    inFrame.eq(i).css("background", "#D29E5F");
                    break;
                case "8":
                    inFrame.eq(i).css("background", "#FAC25B");
                    break;
                case "16":
                    inFrame.eq(i).css("background", "#FABA48");
                    break;
                case "32":
                    inFrame.eq(i).css("background", "#FA9738");
                    break;
                case "64":
                    inFrame.eq(i).css("background", "#FA8B31");
                    break;
                case "128":
                    inFrame.eq(i).css("background", "#FA7322");
                    break;
                case "256":
                    inFrame.eq(i).css("background", "#FA5A11");
                    break;
                case "512":
                    inFrame.eq(i).css("background", "#FA4E21");
                    break;
                case "1024":
                    inFrame.eq(i).css("background", "#FA3B19");
                    break;
                case "2048":
                    inFrame.eq(i).css("background", "#FA2914");
                    break;
                default:
                    inFrame.eq(i).css("background", "antiquewhite");
            }
        }
    },
    //随机生成盒子（调用事件时）
    createBox:function(){
        var num=Math.floor(Math.random()*16);
        //2或4的随机数
        var num1=Math.random();
        var inFrame=$(".inFrame");
        if(inFrame.eq(num).html()=="")
        {
            if(num1<0.1)
            {
                inFrame.eq(num).html("4");
                this.changeColor();
            }
            if(num1>0.1)
            {
                inFrame.eq(num).html("2");
                this.changeColor();
            }
        }
        else {
            return this.createBox();
        }
    },
    //更改位置（调用事件时）
    changeOrder:function(a,b) {
        var outFrame = $("#outFrame");
        var arr=outFrame.find("div").toArray();
        var temp;//用于处理临时变量
        temp=arr[a];
        arr[a]=arr[b];
        arr[b]=temp;
        outFrame.html(arr);
    },
    //融合相同块,如果有相同则合并，且把下面的块上移
    Remix:function (way,num) {
        var inFrame=$(".inFrame");
        var a=0;//用于判断是否相融
        if(way=="w") {
            for (var i = 4; i < 16; i++) {
                if (inFrame.eq(i).html() != "" && inFrame.eq(i - 4).html() != "") {
                    var text1 = inFrame.eq(i).html();
                    var text2 = inFrame.eq(i - 4).html();
                    if (text1 == text2) {
                        a++;
                        var text3 = Number(text1) + Number(text2);
                        inFrame.eq(i).html("");
                        inFrame.eq(i - 4).html(text3.toString());
                        if(i<8)
                        {
                            this.changeOrder(i+4,i);
                            this.changeOrder(i+8,i+4);
                        }
                        else if(i<12&&i>7)
                        {
                            this.changeOrder(i+4,i+8);
                        }
                        inFrame = $(".inFrame");
                    }

                }
            }
            //如果没有发生盒子移动而只发生消融时，也创造一个盒子
            if(num==0&&a!=0)
            {
                this.createBox();
            }
        }
        if(way=="s") {
            for (var i = 11; i > -1; i--) {
                if (inFrame.eq(i).html() != "" && inFrame.eq(i + 4).html() != "") {
                    var text1 = inFrame.eq(i).html();
                    var text2 = inFrame.eq(i + 4).html();
                    if (text1 == text2) {
                        a++;
                        var text3 = Number(text1) + Number(text2);
                        inFrame.eq(i).html("");
                        inFrame.eq(i + 4).html(text3.toString());
                        if(i>7)
                        {
                            this.changeOrder(i-4,i);
                            this.changeOrder(i-8,i-4);
                        }
                        else if(i>3&&i<8)
                        {
                            this.changeOrder(i-4,i);
                        }
                        inFrame = $(".inFrame");
                    }
                }
            }
            if(num==0&&a!=0)
            {
                this.createBox();
            }
        }
        if(way=="a") {
            for (var i = 0; i < 16; i++) {
                if (inFrame.eq(i).html() != "" && inFrame.eq(i - 1).html() != "") {
                    var text1 = inFrame.eq(i).html();
                    var text2 = inFrame.eq(i - 1).html();
                    if (text1 == text2) {
                        a++;
                        var text3 = Number(text1) + Number(text2);
                        inFrame.eq(i).html("");
                        inFrame.eq(i - 1).html(text3.toString());
                        inFrame = $(".inFrame");
                        if(i==1||i==5||i==9||i==13)
                        {
                            this.changeOrder(i,i+1);
                            this.changeOrder(i+1,i+2);
                        }
                        if(i==2||i==6||i==10||i==14)
                        {
                            this.changeOrder(i,i+1);
                        }
                        inFrame = $(".inFrame");
                    }
                }
            }
            if(num==0&&a!=0)
            {
                this.createBox();
            }
        }
        if(way=="d") {
            for (var i = 15; i > -1; i--) {
                if (inFrame.eq(i).html() != "" && inFrame.eq(i + 1).html() != "") {
                    var text1 = inFrame.eq(i).html();
                    var text2 = inFrame.eq(i + 1).html();
                    if (text1 == text2) {
                        a++;
                        var text3 = Number(text1) + Number(text2);
                        inFrame.eq(i).html("");
                        inFrame.eq(i + 1).html(text3.toString());
                        inFrame = $(".inFrame");
                        if(i==2||i==6||i==10||i==14)
                        {
                            this.changeOrder(i,i-1);
                            this.changeOrder(i-1,i-2);
                        }
                        if(i==1||i==5||i==9||i==14)
                        {
                            this.changeOrder(i,i-1);
                        }
                        inFrame = $(".inFrame");
                    }

                }
            }
            if(num==0&&a!=0)
            {
                this.createBox();
            }
        }

    },
    //判断游戏结束
    gameOver:function () {
        var inFrame=$(".inFrame");
        var num=0;//用于判断是否有数
        //每一个格子都有数
        for(var i=0;i<16;i++)
        {
            if(inFrame.eq(i).html()!="")
            {
                num++;
            }
            if(num==16)
            {
                if (inFrame.eq(i).html() != inFrame.eq(i + 1).html() &&
                    inFrame.eq(i).html() != inFrame.eq(i + 4).html() &&
                    inFrame.eq(i).html() != inFrame.eq(i - 1).html() &&
                    inFrame.eq(i).html() != inFrame.eq(i - 4).html())
                {
                    alert("游戏结束啦，请继续努力");
                    this.gameReplace();
                }
            }
        }},
    //判断游戏胜利
    gameWin:function () {
        for(var i=0;i<16;i++)
        {
            if(inFrame.eq(i).html()=="2048")
            {
                alert("恭喜你获胜了");
                this.gameReplace();
            }
        }
    },
    //判断得分
    gameSore:function () {
        var score=0;
        for(var i=0;i<16;i++)
        {
            if(inFrame.eq(i).html()!="2")
            {
                score+=Number(inFrame.eq(i).html());
            }
        }
        $("#score").text(score);

    },
    //w事件
    keyCodeW:function () {
        var num=0;//判断是否能够移动
        if(frag!=0)//判断游戏是否开始
        {
            var inFrame=$(".inFrame");
            //判断是否有数
            for (var i = 4; i < 16; i++) {
                if(i>3&&i<8&&inFrame.eq(i).html()!=""&&inFrame.eq(i-4).html()=="")
                {
                    this.changeOrder(i, i - 4);
                    inFrame = $(".inFrame");
                    num++;

                }
                if(i>7&&i<12&&inFrame.eq(i-4).html()==""&&inFrame.eq(i).html()!="")
                {
                    if(inFrame.eq(i-8).html()=="")
                    {
                        this.changeOrder(i,i-8);
                        inFrame=$(".inFrame");
                        num++;
                    }

                    this.changeOrder(i, i - 4);
                    inFrame=$(".inFrame");
                    num++;

                }
                if(i>11&&i<16&&inFrame.eq(i-4).html()==""&&inFrame.eq(i).html()!="")
                {
                    if(inFrame.eq(i-8).html()=="")
                    {
                        if(inFrame.eq(i-12).html()=="")
                        {
                            this.changeOrder(i,i-12);
                            inFrame=$(".inFrame");
                            num++;
                        }
                        this.changeOrder(i,i-8);
                        inFrame=$(".inFrame");
                        num++;
                    }
                    this.changeOrder(i,i-4);
                    inFrame=$(".inFrame");
                    num++;
                }
            }
            this.Remix("w",num);
            //实现移动时，才创造盒子
            if(num!=0){
                this.createBox();
            }
            this.changeColor();//渲染颜色
            this.gameSore();//刷新得分
            this.gameWin();//判断游戏是否胜利
            this.gameOver();//判断游戏是否结束
        }
        },
    //s事件
    keyCodeS:function() {
        var num=0;
        if(frag!=0)//判断游戏是否开始
        {
            var inFrame = $(".inFrame");
            //判断是否有数
            for (var i = 11; i > -1; i--) {
                if(i>7&&i<12&&inFrame.eq(i+4).html()==""&&inFrame.eq(i).html()!="")
                {
                    this.changeOrder(i,i+4);
                    inFrame=$(".inFrame");
                    num++;
                }
                if(i>3&&i<8&&inFrame.eq(i+4).html()==""&&inFrame.eq(i).html()!="")
                {
                    if(inFrame.eq(i+8).html()=="")
                    {
                        this.changeOrder(i,i+8);
                        inFrame=$(".inFrame");
                        num++;
                    }
                    this.changeOrder(i,i+4);
                    inFrame=$(".inFrame");
                    num++;
                }
                if(i>-1&&i<4&&inFrame.eq(i+4).html()==""&&inFrame.eq(i).html()!="")
                {
                    if(inFrame.eq(i+8).html()=="")
                    {
                        if(inFrame.eq(i+12).html()=="")
                        {
                            this.changeOrder(i,i+12);
                            inFrame=$(".inFrame");
                            num++;
                        }
                        this.changeOrder(i,i+8);
                        inFrame=$(".inFrame");
                        num++;
                    }
                    this.changeOrder(i,i+4);
                    inFrame=$(".inFrame");
                    num++;
                }
            }
            this.Remix("s",num);
            if(num!=0)
            {
                this.createBox();//随机生成盒子
            }
            this.changeColor();//渲染颜色
            this.gameSore();//刷新得分
            this.gameWin();//判断游戏是否胜利
            this.gameOver();//判断游戏是否结束
        }},
    //A事件
    keyCodeA:function() {
        var num=0;
        if(frag!=0)//判断游戏是否开始
        {
            var inFrame = $(".inFrame");
            //判断是否有数
            for (var i = 0; i < 16; i++) {
                if (i == 1 || i == 5 || i == 9 || i == 13)//第二列
                {
                    if (inFrame.eq(i).html() != "" && inFrame.eq(i - 1).html() == "") {
                        this.changeOrder(i, i - 1);
                        inFrame=$(".inFrame");
                        num++;
                    }
                }
                if (i == 2 || i == 6 || i == 10 || i == 14) {
                    if (inFrame.eq(i).html() != "" && inFrame.eq(i - 1).html() == "") {
                        if (inFrame.eq(i - 2).html() == "") {
                            this.changeOrder(i, i - 2)
                            inFrame=$(".inFrame");
                            num++;
                        }
                        this.changeOrder(i, i - 1)
                        inFrame=$(".inFrame");
                        num++;
                    }
                }
                if (i == 3 || i == 7 || i == 11 | i == 15) {
                    if (inFrame.eq(i).html() != "" && inFrame.eq(i - 1).html() == "") {
                        if (inFrame.eq(i - 2).html() == "") {
                            if (inFrame.eq(i - 3).html() == "") {
                                this.changeOrder(i, i - 3);
                                inFrame=$(".inFrame");
                                num++;
                            }
                            this.changeOrder(i, i - 2);
                            inFrame=$(".inFrame");
                            num++;
                        }
                        this.changeOrder(i, i - 1);
                        inFrame=$(".inFrame");
                        num++;

                    }
                }
            }
            this.Remix("a",num);
            if(num!=0)
            {
                this.createBox();//随机生成盒子
            }
            this.changeColor();//渲染颜色
            this.gameSore();//刷新得分
            this.gameWin();//判断游戏是否胜利
            this.gameOver();//判断游戏是否结束
        }

    },
    //D事件
    keyCodeD:function() {
        var num=0;
        if(frag!=0)//判断游戏是否开始
        {
            var inFrame = $(".inFrame");
            //判断是否有数
            for (var i = 15; i >-1; i--) {
                if (i == 2 || i == 6 || i == 10 || i == 14)//第二列
                {
                    if (inFrame.eq(i).html() != "" && inFrame.eq(i + 1).html() == "") {
                        this.changeOrder(i, i + 1);
                        inFrame=$(".inFrame");
                        num++;
                    }
                }
                if (i == 1 || i == 5 || i == 9 || i == 13) {
                    if (inFrame.eq(i).html() != "" && inFrame.eq(i + 1).html() == "") {
                        if (inFrame.eq(i + 2).html() == "") {
                            this.changeOrder(i, i + 2)
                            inFrame=$(".inFrame");
                            num++;
                        }
                        this.changeOrder(i, i + 1)
                        inFrame=$(".inFrame");
                        num++;
                    }
                }
                if (i == 0 || i == 4 || i == 8 | i == 12) {
                    if (inFrame.eq(i).html() != "" && inFrame.eq(i + 1).html() == "") {
                        if (inFrame.eq(i + 2).html() == "") {
                            if (inFrame.eq(i + 3).html() == "") {
                                this.changeOrder(i, i + 3);
                                inFrame=$(".inFrame");
                                num++;
                            }
                            this.changeOrder(i, i + 2);
                            inFrame=$(".inFrame");
                            num++;
                        }
                        this.changeOrder(i, i + 1);
                        inFrame=$(".inFrame");
                        num++;
                    }
                }
            }
            this.Remix("d",num);
            if(num!=0)
            {
                this.createBox();//随机生成盒子
            }
            this.changeColor();//渲染颜色
            this.gameSore();//刷新得分
            this.gameWin();//判断游戏是否胜利
            this.gameOver();//判断游戏是否结束
        }
    }
};
//全局变量，少用（无法回收）,存取了DOM（.inFrame）
var inFrame=$(".inFrame");
var frag=0;
//实例化对象
var game=new Game2048();
//绑定按钮事件，开始游戏
$("#gameStart").click(function () {
    game.gameStart();
});
//绑定按钮事件，重置游戏
$("#gameReplace").click(function () {
    game.gameReplace();

});
//绑定操作事件
$(document).keydown(function (ev) {
    switch (ev.keyCode)
    {
        case 87:game.keyCodeW();//w事件
            break;
        case 83:game.keyCodeS();//s事件
            break;
        case 65:game.keyCodeA();//a事件
            break;
        case 68:game.keyCodeD();//d事件
            break;
    }
});
