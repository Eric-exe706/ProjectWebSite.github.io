const form = document.getElementById("loginForm");
const messageBox = document.getElementById("message");

function setMessage(text, type = 'info') {
    messageBox.textContent = text;
    messageBox.className = type;
    messageBox.classList.add('message',type);
}

form.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    setMessage("Memproses...", 'info');

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        setMessage(result.message, response.ok ? 'success' : 'error');
    } catch (error) {
        setMessage("Terjadi kesalahan. Silakan coba lagi.", 'error');
    }
});