async function getUsers() {
  const url = 'https://reqres.in/api/users';
  const res = await fetch(url);
  return res.json();
}

QUnit.test('get not empty data from mockapi', async assert => {
  let temp;
  await getUsers().then(res => {
    if (res.data) temp = res.data;
  });
  assert.true(temp.length > 0, true, 'Result');
});

QUnit.test('render correct name', async assert => {
  let temp;
  const done = assert.async();
  await getUsers().then(res => {
    if (res.data) temp = res.data;
    done();
  });
  const [card] = document.getElementsByClassName('user');
  const [name] = card.getElementsByClassName('name');
  assert.equal(
    name.innerHTML,
    `${temp[0].first_name} ${temp[0].last_name}`,
    'Result'
  );
});

QUnit.test('render show more button', async assert => {
  let temp;
  const done = assert.async();
  await getUsers().then(res => {
    if (res.data) temp = res.data;
    done();
  });
  const [card] = document.getElementsByClassName('user');
  const [button] = card.getElementsByClassName('button');
  assert.equal(button.innerHTML, 'Show more', 'Result');
});
