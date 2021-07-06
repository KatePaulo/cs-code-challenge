async function getUsers(container) {
  const url = 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment';
  try {
    let res = await fetch(url);
    return res.json();
  } catch (error) {
      renderTemplate({error}, container);
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
  let users = await getUsers(container);
  if (!users) return;
  renderTemplate(users, container);
}

renderUsers();
