const url = new URL("http://127.0.0.1:9090/.well-known/mercure")
url.searchParams.append("topic", "/events")
const eventSource = new EventSource(url)
eventSource.onmessage = (event) => { console.log(JSON.parse(event.data)) }