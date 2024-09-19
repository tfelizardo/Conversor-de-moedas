const USD = 4.87
const EUR = 5.32
const GBP = 6.08

/*
  form para capturar o evento de submit do formulário
  amount é o input do valor
  currency é o da moeda
 */
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")



// 1º INICIO // Manipulando o ipunt para receber somente números
amount.addEventListener("input" , () => {

// 2º utilizando a expressão do regex para receber somente números no input
const hasCharacterRegex = /\D+/g
amount.value = amount.value.replace(hasCharacterRegex,"")

})

// 3º captando o evento de submit (enviar) do formulário

form.onsubmit = (event) => {
event.preventDefault() 
//5º criando switch para analisar os casos.
switch(currency.value){ 
 case"USD":
convertCurrency(amount.value, USD,"US$")
break
 case "EUR":
convertCurrency(amount.value,EUR,"€")
 break
 case"GBP":
convertCurrency(amount.value, GBP,"£")
break
}
}

// 4º Função para converter moeda

//5º adicionando o footer
function convertCurrency (amount,price,symbol){
    try {
        // 6ºmanipulando o conteudo da description `utilizando interpolação`
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}` 
    
        // calcula o total
        let total = amount * price 

      if(isNaN (total)){
        return alert ("Por favor, digite o valor corretamente para converter.")
      }

        // FORMATA O VALOR TOTAL
       total = formatCurrencyBRL(total).replace("R$","")

        // exibe o resultado total 
        result.textContent = `${total} Reais`

        // aplica classe que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")
    } catch (error) {
        // Remove a classe do footer removendo ele da tela
        footer.classList.remover("show-result")
        alert("não foi possível converter. Tente novamente mais tarde.")

    }

}

// formata a moeda em real brasileiro
function formatCurrencyBRL(value){
    // converte para número para utilizar o toLocaleString para formatar no padrão BRL
return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
}
)


}

