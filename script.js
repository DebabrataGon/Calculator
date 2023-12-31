let operation = document.querySelector(".operation"); 
let result = document.querySelector(".result"); 
const buttons = document.querySelectorAll('.btn');
let flag=1;

buttons.forEach(
    function(button)
    {

        button.addEventListener("click",method);
    }
    );

    function method()
    {
        if(this.textContent=="CE")
        {
            result.textContent=result.textContent.substring(0,result.textContent.length-1)
            if(result.textContent=="")
            {
                result.textContent="0";
                flag=1;
            }
        }
        else if(this.textContent!='0' || flag==0)
        {
            if(flag==1) result.textContent="";
            flag=0;
            result.textContent+=this.textContent;
        }
        else
        {
            result.textContent="0";
        }
        if(this.textContent=="=")
        {
            //console.log(this.textContent);
            calculate2(result);
            flag=1;
        }
    };

    function calculate(result)
    {
        let n=0;
        let i=0;
        let operator='+';
        for(;i<result.textContent.length;i++)
        {
            let ch=result.textContent[i];
            if(ch>='0' && ch<='9')
            {
                n=n*10+(ch-'0');
            }
            else
            {
                operator=ch;
                break;
            }
        }
        let answer=n;
        n=0;
        for(;i<result.textContent.length;i++)
        {
            let ch=result.textContent[i];
            if(ch>='0' && ch<='9')
            {
                n=n*10+(ch-'0');
            }
        }
        switch(operator)
        {
            case '+':
                answer+=n;
                break;
            case '-':
                answer-=n;
                break;
            case '×':
                answer*=n;
                break;
            case '/':

                if(n!=0)answer/=n;
                else answer="Undefined"
                break;
        }
        operation.textContent=result.textContent;
        result.textContent=answer;
    }


    function calculate2(result)
    {
        console.log("expression: "+result.textContent);
        
        console.log(result);
        let answer=0;
        let last=0;
        let current=0;
        let operator='+';
        let stack=[];
        console.log(result.textContent.length);
        console.log(result.textContent[result.textContent.length-1]);
        for(let i=0;i<=(result.textContent.length)-2 && result.textContent[i]!='=';i++)
        {
            let ch=result.textContent[i];
            console.log("expression: "+result.textContent);
            console.log(ch);
            console.log(i);
            if(ch>='0'&& ch<='9')
            {
                current=current*10+(ch-'0')
            }
            if(!(ch>='0'&& ch<='9') || i==result.textContent.length-2)
            {
                if(operator=='×')
                {
                    last=last*current;
                }
                else if(operator=='/')
                {
                    last=last/current;
                }
                else if(operator=='+')
                {
                    answer+=last;
                    last=current;
                    console.log(answer);
                }
                else if(operator=='-')
                {
                    answer+=last;
                    last=-current;
                }
                current=0;
                operator=ch;

                if(ch=='(')
                {
                    stack.push([answer,last,operator]);
                    answer=0;
                    last=0;
                    operator='+';
                }
                else if(ch==')')
                {
                    answer+=last;
                    current=answer;
                    let arr=stack.pop();
                    result=arr[0];
                    last=arr[1];
                    operator=arr[2];
                    console.log(answer);

                }
                else if(i==result.textContent.length-2)
                {
                    answer+=last;
                    console.log(answer);
                }
            }
        }
        //answer
        operation.textContent=result.textContent;
        result.textContent=answer;
    }