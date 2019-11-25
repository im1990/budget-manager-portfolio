
//=========================================================
//                     グローバル定数
//=========================================================

// 収入リストの情報を入れておく配列
const income = [];
// 支出リストの情報を入れておく配列
const expenses = [];
// 買い物リストの情報を入れておく配列
const shopping = [];

//==========================================================
//                           TOP 
//==========================================================

//----------------------------------------------------------
//                    現在の年月を計算する
//----------------------------------------------------------

window.onload = function() {
    const budgetTitle = document.querySelector('.budget__title');
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() +1;
    budgetTitle.textContent = `${year}年 ${month}月の予算`;
}

//----------------------------------------------------------
//                     収入の合計を計算する
//----------------------------------------------------------

const calcIncome = function() {
    const budgetIncomeValue = document.querySelector('.budget__income--value');
    
    if(income.length <= 0) {
        budgetIncomeValue.textContent = 0;

    } else {
        let sum = 0;
        for(let i = 0; i < income.length; i++) {
            // コンマを空欄に置き換える
            const replaceComma = (income[i].value).replace(/,/g, "");
            // 文字列から数値になおす
            const curNum = parseInt(replaceComma);
            // 合計値を計算
            sum += curNum;
        }
        // 合計値にコンマをつける
        const stringSum = sum.toLocaleString();
        budgetIncomeValue.textContent = stringSum;
    }
}

//----------------------------------------------------------
//                    支出の合計を計算する
//----------------------------------------------------------

const calcExpenses = function() {
    const budgetExpensesValue = document.querySelector('.budget__expenses--value');
    
    if(expenses.length <= 0) {
        budgetExpensesValue.textContent = 0;

    } else {
        let sum = 0;
        for(let i = 0; i < expenses.length; i++) {
            // コンマを空欄に置き換える
            const replaceComma = (expenses[i].value).replace(/,/g, "");
            // 文字列から数値になおす
            const curNum = parseInt(replaceComma);
            // 合計値を計算
            sum += curNum;
        }
        // 合計値にコンマをつける
        const stringSum = sum.toLocaleString();
        budgetExpensesValue.textContent = stringSum;
    }
}

//----------------------------------------------------------
//                   支出の割合を計算する
//----------------------------------------------------------

const calcPercentage = function() {
    const budgetIncomeValue = document.querySelector('.budget__income--value');
    const budgetExpensesValue = document.querySelector('.budget__expenses--value');
    const budgetExpensesPercentage = document.querySelector('.budget__expenses--percentage');

    if(!income.length || !expenses.length) {
        budgetExpensesPercentage.textContent = '0%';

    } else {
        // 収入、支出共にコンマを空欄に置き換えて、数値に戻す
        const calcIncNum = parseInt((budgetIncomeValue.textContent).replace(/,/g, ""));
        const calcExpNum = parseInt((budgetExpensesValue.textContent).replace(/,/g, ""));
        // (支出 ÷ 収入) × 100 => 少数点以下四捨五入
        budgetExpensesPercentage.textContent = `${Math.round((calcExpNum / calcIncNum) * 100)}%`;
    }
}

//----------------------------------------------------------
//                     収入ー支出を計算する
//----------------------------------------------------------

const calcBudget = function() {
    const budgetValue = document.querySelector('.budget__value');
    const budgetIncomeValue = document.querySelector('.budget__income--value');
    const budgetExpensesValue = document.querySelector('.budget__expenses--value');
    // 収入、支出共にコンマを空欄に置き換えて、数値に戻す
    const calcIncNum = parseInt((budgetIncomeValue.textContent).replace(/,/g, ""));
    const calcExpNum = parseInt((budgetExpensesValue.textContent).replace(/,/g, ""));
    // 収入 - 支出 を計算 => コンマをつける
    const incMinusExp = (calcIncNum - calcExpNum).toLocaleString();
    budgetValue.textContent = incMinusExp;
}

//=========================================================
//                         BOTTOM 
//=========================================================

//---------------------------------------------------------
//                  リスト削除ボタン生成
//---------------------------------------------------------

const createDeleteListItem = function() {

    // 削除ボタンのコンテナを生成
    const createDeleteDiv = document.createElement('div'); 
    createDeleteDiv.classList.add('item__delete');               
    
    // ボタン要素を生成
    const createDeleteButton = document.createElement('button');
    createDeleteButton.classList.add('item__delete--btn');      

    // ゴミ箱アイコンを生成
    const deleteIcon = document.createElement('i');     
    deleteIcon.classList.add('ion-ios-close-outline');  

    // それぞれの要素を成形
    createDeleteDiv.appendChild(createDeleteButton);  
    createDeleteButton.appendChild(deleteIcon);         

    return createDeleteDiv;
}

//---------------------------------------------------------
//   　リスト削除機能（収入リストの削除ボタンクリック時）
//---------------------------------------------------------

const deleteIncItem = function(index) {
    income.splice(index, 1);
    createIncomeList(income);
}

//---------------------------------------------------------
//   　リスト削除機能（支出リストの削除ボタンクリック時）
//---------------------------------------------------------

const deleteExpItem = function(index) {
    expenses.splice(index, 1);
    createExpenseList(expenses);
}

//---------------------------------------------------------
//   　リスト削除機能（買い物リストの削除ボタンクリック時）
//---------------------------------------------------------

const deleteShopItem = function(index) {
    shopping.splice(index, 1);
    createShoppingList();
}

//---------------------------------------------------------
//                 買い物リスト追加ボタン生成
//---------------------------------------------------------

const shoppingItem = function() {

    // ボタン要素の生成
    const createShoppingBtn = document.createElement('button');
    createShoppingBtn.classList.add('shopping__add--btn');

    // バスケットアイコンの生成
    const shoppingIcon = document.createElement('i');
    shoppingIcon.classList.add('fas');
    shoppingIcon.classList.add('fa-shopping-basket');

    // それぞれの要素を成形
    // createShoppingDiv.appendChild(createShoppingBtn);
    createShoppingBtn.appendChild(shoppingIcon);

    // 買い物ボタンをクリックすると買い物リストに反映される
    // createShoppingBtn.addEventListener('click', () => {
    //     createShoppingList()
    // });

    return createShoppingBtn
}

//---------------------------------------------------------
//                   収入リストの作成
//---------------------------------------------------------
    // <完成形>
    // <div class="item clearfix">                              ・・・（１）
    //     <div class="item__description">お給料</div>　　　　　 ・・・（２）
    //     <div class="right clearfix">　　　　               　 ・・・（３）
    //         <div class="item__value">200,000</div>　　　 　　 ・・・（４） 
    //         <div class="item__delete">　　　　             　 ・・・ createDeleteListItem()
    //             <button class="item__delete--btn">           
    //                 <i class="ion-ios-close-outline"></i>    
    //             </button>
    //         </div>
    //     </div>
    // </div>
//---------------------------------------------------------

const createIncomeList = function(type) {

    // 収入リスト表示エリアのDOMを取得
    const incomeList = document.querySelector('.income__list');
    
    // リストアイテムを削除した際にこの関数を実行してリストを最成形させるため、
    // 前の情報が残らないよう一度リスト表示エリアを白紙に戻す
    incomeList.innerHTML = '';

    type.forEach((item) => {

        // （１）リストのコンテナを生成
        const createItemDiv = document.createElement('div'); 
        createItemDiv.classList.add('item');           
        createItemDiv.classList.add('clearfix');        

        // （２）費目表示欄を生成
        const createDescriptionDiv = document.createElement('div'); 
        createDescriptionDiv.classList.add('item__description');    
        createDescriptionDiv.textContent = item.name;  

        // （３）金額、削除ボタンのコンテナを生成
        const createRightDiv = document.createElement('div'); 
        createRightDiv.classList.add('right');         
        createRightDiv.classList.add('clearfix');         

        // （４）金額表示欄を生成
        const createValueDiv = document.createElement('div');
        createValueDiv.classList.add('item__value');    
        createValueDiv.textContent = item.value;   

        // 削除ボタンを生成
        const deleteBtn = createDeleteListItem();  

        // リストアイテム成形
        incomeList.appendChild(createItemDiv);                
        createItemDiv.appendChild(createDescriptionDiv);    　
        createItemDiv.appendChild(createRightDiv);    
        createRightDiv.appendChild(createValueDiv);  
        createRightDiv.appendChild(deleteBtn);  

        // 削除ボタンを押すと、クリックした要素が配列から削除される
        deleteBtn.addEventListener('click', () => {
            deleteIncItem(item.id);
        })

        return deleteBtn;

    })

}

//----------------------------------------------------------
//                      支出リストの作成
//----------------------------------------------------------
// <完成形>
//<div class="item clearfix">　　　　　　　　　　　　　　    　　・・・（１）
//    <button class="shopping__add--btn">                　   ・・・shoppingItem() 
//       <i class="fas fa-shopping-basket"></i>               
//    </button>                                            
//    <div class="item__description">生活費</div>　　　　　　　 ・・・（２）
//    <div class="right clearfix">　　　　　　　　　　　　　　　 ・・・（３）
//        <div class="item__value">-150,000</div>　　　　　　　 ・・・（４）
//        <div class="item__percentage">75%</div>　　　　　　　 ・・・（５）
//        <div class="item__delete">　　　　　　　　　　　　　　 ・・・createDeleteListItem()
//            <button class="item__delete--btn">　　　　　　　 　
//                <i class="ion-ios-close-outline"></i>　　　　 
//            </button>
//        </div>
//     </div>
//</div>
//----------------------------------------------------------

const createExpenseList = function(type) {

    // 支出リスト表示エリアのDOMを取得
    const expensesList = document.querySelector('.expenses__list');
    
    // リストアイテムを削除した際にこの関数を実行してリストを最成形させるため、
    // 前の情報が残らないよう一度リスト表示エリアを白紙に戻す
    expensesList.innerHTML = '';

    type.forEach((item) => {

        // （１）リストのコンテナを生成
        const createItemDiv = document.createElement('div');
        createItemDiv.classList.add('item');
        createItemDiv.classList.add('clearfix');

        // 買い物ボタンを生成
        const shoppingBtn = shoppingItem();
        shoppingBtn.addEventListener('click', e => {
            // クリックしたバスケットボタンのリストに記載してある費目を、買い物リスト用の配列に入れる
            const targetItemName = e.target.parentNode.nextElementSibling.textContent;
            shopping.push(targetItemName);
            createShoppingList() 
        })

        // （２）費目表示欄を生成
        const createDescriptionDiv = document.createElement('div');
        createDescriptionDiv.classList.add('item__description');
        createDescriptionDiv.textContent = item.name;  

        // （３）金額、削除ボタンのコンテナを生成
        const createRightDiv = document.createElement('div');
        createRightDiv.classList.add('right');
        createRightDiv.classList.add('clearfix');

        // （４）金額表示欄を生成
        const createValueDiv = document.createElement('div');
        createValueDiv.classList.add('item__value');
        createValueDiv.textContent = item.value;  

        // （５）支出の割合表示エリアを生成
        const createPercentDiv = document.createElement('div');
        createPercentDiv.classList.add('item__percentage');

        // （５）収入総額に対するアイテム１つの割合（％）を表示
        const budgetIncomeValue = document.querySelector('.budget__income--value');
        const calcIncNum = parseInt((budgetIncomeValue.textContent).replace(/,/g, ""));
        const calcItemExp = parseInt((item.value).replace(/,/g, ""));
        const calcItemPercentage = Math.round((calcItemExp / calcIncNum) * 100); // （アイテム単体の支出 ÷ 収入総額） × 100 
        createPercentDiv.textContent = `${calcItemPercentage}%`;

        // 削除ボタンを生成
        const deleteBtn = createDeleteListItem();  

        // リストアイテム成形
        expensesList.appendChild(createItemDiv);
        createItemDiv.appendChild(shoppingBtn);
        createItemDiv.appendChild(createDescriptionDiv);
        createItemDiv.appendChild(createRightDiv);
        createRightDiv.appendChild(createValueDiv);
        createRightDiv.appendChild(createPercentDiv);
        createRightDiv.appendChild(deleteBtn);

        // 削除ボタンを押すと、クリックした要素が配列から削除される
        deleteBtn.addEventListener('click', () => {
            deleteExpItem(item.id);
        })

        return deleteBtn;

    })
}

//----------------------------------------------------------
//                    買い物リストの作成
//----------------------------------------------------------
// <完成形>
//<div class="item clearfix">                               ・・・（１）
//    <input type="checkbox" class="shopping__checkbox">    ・・・（２）
//    <label class="shopping__checkbox--label"></label>     ・・・（３）
//    <div class="item__delete">                            ・・・createDeleteListItem()
//        <button class="item__delete--btn">               
//            <i class="ion-ios-close-outline"></i>    
//        </button>
//    </div>
//</div> 
//----------------------------------------------------------

function createShoppingList() {

    // 支出リスト表示エリアのDOMを取得
    const shoppingList = document.querySelector('.shopping__list');
    
    // リストアイテムを削除した際にこの関数を実行してリストを最成形させるため、
    // 前の情報が残らないよう一度リスト表示エリアを白紙に戻す
    shoppingList.innerHTML = '';

    shopping.forEach((item, index) => {

        // （１）リストのコンテナを生成
        const createDiv = document.createElement('div');
        createDiv.classList.add('item');
        createDiv.classList.add('clearfix');

        // （２）チェックボックスを生成
        const createInput = document.createElement('input');
        createInput.type = 'checkbox';
        createInput.classList.add('shopping__checkbox');
        createInput.setAttribute('id', `item${index}`);

        // （３）ラベルを生成
        const createLabel = document.createElement('label');
        createLabel.classList.add('shopping__checkbox--label');
        createLabel.setAttribute('for', `item${index}`);
        createLabel.textContent = item;

        // 削除ボタンを生成
        const deleteBtn = createDeleteListItem();  

        // リストアイテム成形
        shoppingList.appendChild(createDiv);
        createDiv.appendChild(createInput);
        createDiv.appendChild(createLabel);
        createDiv.appendChild(deleteBtn);
        
        // ゴミ箱ボタンを押すと削除する関数
        deleteBtn.addEventListener('click', () => {
            deleteShopItem(index);
        })

        return deleteBtn;
    })
}

//----------------------------------------------------------
//               入力値を配列に追加する関数
//----------------------------------------------------------

const createListItem = function() {

    const addDescription = document.querySelector('.add__description');
    const addType = document.querySelector('.add__type');
    const addValue = document.querySelector('.add__value');

    // inputに何も入力されない場合はアラートが出る
    if(!addDescription.value.length || !addValue.value.length) {
        alert('費目と金額をご記入ください');
        return
    }

    // '+'マークが選択されたとき、配列名:incomeに入力情報を追加する
    if(addType.value === 'inc') {

        // IDを発行
        let ID = 0;
        if(income.length > 0) {
            ID = income[income.length -1].id + 1;
        } else {
            ID = 0;
        } 

        // incomeに {id: インデックス, name:'費目', value:金額} が追加される
        income.push({ 
            id: ID,
            name: addDescription.value,
            value: parseInt(addValue.value).toLocaleString()
        })

        createIncomeList(income);

    // '-'マークが選択されたとき、配列名:expensesに入力情報を追加する
    } else if(addType.value === 'exp') {

        // IDを発行
        let ID = 0;
        if(expenses.length > 0) {
            ID = expenses[expenses.length -1].id + 1;
        } else {
            ID = 0;
        } 

        // expesesに {id: インデックス, name:'費目', value:金額} が追加される
        expenses.push({ 
            id: ID,
            name: addDescription.value,
            value: parseInt(addValue.value).toLocaleString()
        }) 

        createExpenseList(expenses);

    } 

    // 収入総額の計算
    calcIncome();

    // 支出総額の計算
    calcExpenses();

    // 収入に対する支出の割合（％）の計算
    calcPercentage();

    // 収入-支出を算出する
    calcBudget();

    // 入力エリアのリセット
    addDescription.value = '';
    addValue.value = '';
    
}

// 追加ボタンを押すとリストが追加される
const addBtn = document.querySelector('.add__btn');
addBtn.addEventListener('click', () => {
    createListItem();
});

// 金額入力エリアでEnterを押すとリストが追加される
const addValue = document.querySelector('.add__value');
addValue.addEventListener('keypress', e => {
  if(e.key === 'Enter') {
    createListItem();
  }
});
