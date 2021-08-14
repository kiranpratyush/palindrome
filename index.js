'use strict'
const inputDate = document.querySelector("input");
const checkBtn = document.querySelector("button");
const outputval = document.querySelector(".content");
const loader = document.querySelector(".loader");

const datesInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
//function declaration
function checkPalindrome(date)
{   let output = "";
    const dateArray = date.split("-");
    const inputYear = dateArray[0];
    const inputMonth = dateArray[1];
    const inputDate = dateArray[2];

     let isPalindrome = checkAllCombination(inputYear,inputMonth,inputDate)
     if(isPalindrome)
     {
         output = `YAY!!Your bithdate in format ${isPalindrome} is Palindrome`;
     }
     else
     {
         let [nextdate,diff] = findNextDate(inputDate,inputMonth,inputYear);
         output =  `Awww! Your birthdate is not palindrome. Nearest palindrome date is ${nextdate} \n You missed it by ${diff} days.`;

     }
     outputval.textContent = output;
     outputval.classList.remove("display");
     loader.classList.add("display");

}
function checkAllCombination(yyyy, mm, dd){
       
    //yyyymmdd format string 20211223
    const dateFormat1 = yyyy+mm+dd;
    
     //ddmmyyyy format string 23122021
     const dateFormat2 = dd+mm+yyyy;

    //mmddyy format string 2021 will be converted to 21
    const dateFormat3 = mm+dd+yyyy.substring(2);
        
    //mddyyyy format string for example Month 02 will be converted to 2
    const dateFormat4 = Number(mm)+dd+yyyy;

    if (isPalindrome(dateFormat1)){
        return (`${yyyy}-${mm}-${dd}`);
    }
    else if(isPalindrome(dateFormat2)){
        return (`${dd}-${mm}-${yyyy}`);
    }
    else if(isPalindrome(dateFormat3)){
        return (`${mm}-${dd}-${yyyy.substring(2)}`);
    }
    else if(isPalindrome(dateFormat4)){
        return (`${Number(mm)}-${dd}-${yyyy}`);
    }
    else{
        return null;
    }

   }

function isPalindrome(date)
{
    return date===date.split("").reverse().join("") // first split the string into an array then reverse it inplace and then join it and check for the palindrome
}
function findNextDate(date, month, year){
    let forwardDate= Number(date);
    let forwardMonth= Number(month);
    let forwardYear=Number(year);
    let backwardDate= Number(date);
    let backwardMonth= Number(month);
    let backwardYear=Number(year);
    
    for(let i=1; i>0; i++){

        //forward check
        forwardDate= forwardDate+1;
        if(forwardDate> Number(datesInMonth[forwardMonth-1])){
            forwardDate= 1;
            forwardMonth = forwardMonth+1;
            if(forwardMonth > 12){
                forwardMonth = 1;
                forwardYear = forwardYear+1;
            }
        }
        let yyString = forwardYear.toString();
        let mmString = forwardMonth.toString();
        let ddString = forwardDate.toString();
        if(mmString.length==1){
            mmString="0"+mmString;
        }
        if(ddString.length==1){
            ddString="0"+ddString;
        }
        let isPalindrome = checkAllCombination(yyString, mmString, ddString);
        if(isPalindrome){
            return [`${isPalindrome}`, i];
        }

        //backward check
        if(backwardYear>1){
           backwardDate =backwardDate-1;
            if(backwardDate<1){
               backwardMonth =backwardMonth-1;
                if(backwardMonth < 1){
                   backwardMonth = 12;
                    backwardYear = backwardYear-1;
                    if(backwardYear<1){
                        break;
                    }
                   backwardDate = datesInMonth[backwardMonth-1];
                }
            }
            let yyString = backwardYear.toString();
            let mmString =backwardMonth.toString();
            let ddString =backwardDate.toString();
            if(mmString.length==1){
                mmString="0"+mmString;
            }
            if(ddString.length==1){
                ddString="0"+ddString;
            }
            let isPalindrome = checkAllCombination(yyString, mmString, ddString);
            if(isPalindrome){
                return [`${isPalindrome}`, i];
            }
        }

   }
   return "Sorry no palindrome exists" //If Year becomes negative
   
}

checkBtn.addEventListener("click",function()
{   let value = inputDate.value;
    
    if(!outputval.classList.contains('display'))
    {
        outputval.classList.add("display");

    }
    if(value.split("-")[0]===''||value.split("-")===''||value.split("-")==='')
    {
        outputval.textContent ="Enter correct values of Date "
        outputval.classList.remove("display");
    }
    else{
        loader.classList.remove("display");
    setTimeout(function(){checkPalindrome(value)},3000);
    }
})




