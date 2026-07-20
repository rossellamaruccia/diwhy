const menuIcon = document.querySelector("#menu")
const navLinks = document.querySelector(".navLinks")

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

const contactForm = document.getElementById("contactForm")
const url = document.URL

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let fName = document.getElementById('fname')
  let fEmail = document.getElementById('email')
  let fMessage = document.getElementById('message')

  let formData = {
    name: fName.value,
    email: fEmail.value,
    message: fMessage.value
  }

  async function postForm() {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
        alert('something went wrong!')
      }

      const result = await response.json()
      console.log("Success:", result)
      alert('message sent!')
      formData.email = ''
      formData.name = ''
      formData.message = ''
    } catch (error) {
      console.error("Error:", error.message)
    }
  }

  postForm();
})