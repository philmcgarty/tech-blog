async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="blog-title"]').value;
    const article = document.querySelector('textarea[name="blog-article"]').value;

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