const menuIcon = document.querySelector("#menu")
const navLinks = document.querySelector(".navLinks")
const validationContainer = document.getElementById("validationContainer")
const icons = document.getElementsByClassName('icon')

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

const contactForm = document.getElementById("contactForm")

contactForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let fName = document.getElementById("fname")
  let fEmail = document.getElementById("email")
  let fMessage = document.getElementById("message")

  let formData = {
    name: fName.value,
    email: fEmail.value,
    message: fMessage.value,
  }

  try {
      const response = fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

    if (!response.ok) {
      e.preventDefault()
      validationContainer.style.display = "block"
      validationContainer.style.border = "1px solid red"
      validationContainer.style.backgroundColor = "rgba(252, 0, 0, 0.58)"
      validationContainer.innerHTML = `<small>Something went wrong, try again!</small>`
      
        throw new Error(`Response status: ${response.status}`)
    } else {
      e.preventDefault()
        const result = response.json()
        formData.name = ""
        formData.email = ""
        formData.message = ""
        validationContainer.style.display = "block"
        validationContainer.innerHTML = `<small>Message sent! Thank you!</small>`
      }
    } catch (error) {
      console.error("Error:", error.message)
    }
})

// form validation
const attentionIcons = document.getElementsByClassName("icon")
