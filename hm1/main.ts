
const value = document.getElementById('value') as HTMLInputElement;
const clear = document.getElementById('clear') as HTMLButtonElement;

const symbols: string[] = ['+', '-', '*', '/'];
const res: number[] = [];

clear.addEventListener('click', () => {
    value.value = value.value.slice(0, -1);
} );

document.querySelectorAll('.calc').forEach(button => {
    button.addEventListener('click', () => {
        value.value += button.innerHTML;
    })
})

document.querySelectorAll('.symb').forEach(symb => {
    symb.addEventListener('click', () => {
        value.value += symb.innerHTML;
    })
})

const result = document.querySelector('.result') as HTMLButtonElement;

result.addEventListener('click', () => {

    (document.querySelector('p') as HTMLParagraphElement).innerHTML += value.value + ' = ';
    
    let n = 0;
    for (let i = 0; i < value.value.length; i++) {
        for (let char of symbols) {
            if (char == value.value[i] ) {

                res[n] = Number(value.value.slice(0 ,i));
                ++n;
                res[n] = Number(value.value.slice(++i, value.value.length))
                ++n;

                switch(char) {
                    case '+':   
                        res[n] = res[0] + res[1];
                        break;
                    case '-':
                        res[n] = res[0] - res[1];
                        break;
                    case '*':
                        res[n] = res[0] * res[1];
                        break;
                    case '/':
                        res[n] = res[0] / res[1];
                        break;

                }

            }

        }
    }

    value.value = String(res[-1]);

    (document.querySelector('p') as HTMLParagraphElement).innerHTML += res[-1] + '<br>';
})

const his = document.querySelector('.history') as HTMLButtonElement; 

his.addEventListener('click', () => {
    (document.querySelector('.history_list') as HTMLParagraphElement).hidden = false;
})
