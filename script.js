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



// 1º INICIO // Manipulando o input para receber somente números e aplicar máscara de moeda
amount.addEventListener("input", () => {
  // Remove caracteres não-numéricos
  let value = amount.value.replace(/\D/g, "")

  // Converte para centavos e formata como BRL (R$ 0,00)
  value = Number(value) / 100

  // Se o valor for 0, limpa o campo ou mantém formatado? O usuário pediu que apareça sempre R$ 5,00.
  // Vamos formatar para que apareça sempre no padrão R$ 0,00 enquanto digita.
  amount.value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
})

// 3º captando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
  event.preventDefault()

  // Extrai apenas os números do valor formatado para a conversão
  const numericValue = amount.value.replace(/\D/g, "") / 100

  switch (currency.value) {
    case "USD":
      convertCurrency(numericValue, USD, "US$")
      break
    case "EUR":
      convertCurrency(numericValue, EUR, "€")
      break
    case "GBP":
      convertCurrency(numericValue, GBP, "£")
      break
  }
}

// 4º Função para converter moeda

//5º adicionando o footer
function convertCurrency(amount, price, symbol) {
  try {
    // 6ºmanipulando o conteudo da description `utilizando interpolação`
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // calcula o total
    let total = amount * price

    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente para converter.")
    }

    // FORMATA O VALOR TOTAL
    total = formatCurrencyBRL(total).replace("R$", "")

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
function formatCurrencyBRL(value) {
  // converte para número para utilizar o toLocaleString para formatar no padrão BRL
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  }
  )


}

