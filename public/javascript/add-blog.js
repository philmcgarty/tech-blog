// event handler for submitting a new blog
async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="blog-title"]').value;
    const article = document.querySelector('textarea[name="blog-article"]').value;
    // button only responds if both title & article fields completed
    if (title && article) {
        const response = await fetch(`/api/blogs`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                article
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);