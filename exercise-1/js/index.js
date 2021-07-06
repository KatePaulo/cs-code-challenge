async function getUsers(container) {
  const url = 'https://reqres.in/api/users';
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
    renderTemplate({ error }, container);
  }
}

function renderTemplate(data, container) {
  const source = document.getElementById('cards').innerHTML;
  const template = Handlebars.compile(source);
  const compiledHtml = template(data);
  container.innerHTML = compiledHtml;
}

function toggleDetails(event) {
  if (event.target.dataset.close === 'true') {
    return this.remove(event.target);
  }
  const id = event.target.dataset.id;
  if (!id) return;
  const detailsBlock = document.getElementById(id);
  detailsBlock.classList.toggle('hidden');
  event.target.innerHTML = detailsBlock.classList.contains('hidden')
    ? 'Show more'
    : 'Hide';
}

async function renderUsers() {
  const container = document.getElementById('container');
  container.addEventListener('click', toggleDetails);
  let { data } = await getUsers(container);
  if (!data) return;
  renderTemplate(data, container);
}

renderUsers();
