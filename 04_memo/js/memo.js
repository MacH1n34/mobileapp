"use strict";

window.addEventListener("DOMContentLoaded",
function( ){

    if(typeof localStorage === "undefined"){
        window.alert("このブラウザは Local Storage 機能が実装されていません");
        return;
    }else{
        viewstorage( );
        saveLocalStorage( );
        selectTable( );
        delLocalStorage( );
        allClearLocalStorage( );
    }
}
);

function saveLocalStorage( ){
    const save = document.getElementById("save");
    save.addEventListener("click",
function(e){
    e.preventDefault();
    const key   = document.getElementById("textKey").value;
    const value = document.getElementById("textMemo").value;


    if (key =="" || value ==""){
        window.alert("Key.Memo はいずれも必須です.")
        return;
    }else{
        localStorage.setItem(key,value);
        viewstorage( );
        let w_msg = "LocalStorage に" + key + " " + value + "を保存しました";
        window.alert(w_msg);
        document.getElementById("textKey").value=" ";
        document.getElementById("textMemo").value=" ";
    }
},false
);
};

function selectTable( ){
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault;
            selectRadioBtn( );
        },false
    );
};

function selectRadioBtn( ){
    let w_sel = "0";
    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");

    for(let i=0; i < radio1.length ; i++ ){
        if(radio1[i].checked){
            document.getElementById("textKey").value=table1.rows[i+1].cells[1].firstChild.data;
            document.getElementById("textMemo").value=table1.rows[i+1].cells[2].firstChild.data;
            return w_sel = "1";
        }
    }

    window.alert("一つ選択(select)してください");

}

function viewstorage( ){
    const list = document.getElementById("list");
    while(list.rows[0]) list.deleteRow(0);
    for (let i = 0 ; i < localStorage.length ; i++ ){
        let w_key = localStorage.key(i);
        
        let tr  = document.createElement ("tr");
        let td1 = document.createElement ("td");
        let td2 = document.createElement ("td");
        let td3 = document.createElement ("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='radio1' type='radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
}

function delLocalStorage( ){
    const del = document.getElementById("del");
    del.addEventListener("click",
    function(e){
        e.preventDefault( );
        let w_sel="0";
        w_sel = selectRadioBtn( );

        if(w_sel === "1"){
            const key   = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            localStorage.removeItem(key);
            viewstorage( );
            let w_msg = "LocalStorage に" + key + " " + value + "を削除しました";
            window.alert(w_msg);
            document.getElementById("textKey").value=" ";
            document.getElementById("textMemo").value=" ";

            }
    },false
    );
}

function allClearLocalStorage( ){
    const allClear= document.getElementById("allClear");
    allClear.addEventListener("click",
    function(e){
        e.preventDefault( );
        let w_confirm = confirm("Localstorage のデータを全て削除(allclear)します.\n　よろしいですか？");
        if(w_confirm===true){
        localStorage.clear( );
        viewstorage( );
        window.alert(w_msg);
        document.getElementById("textKey").value=" ";
        document.getElementById("textMemo").value=" ";
   
        }
    },false
    )
}