async function getUsers() {
  const url = 'https://5dc588200bbd050014fb8ae1.mockapi.io/assessment';
  const res = await fetch(url);
  return res.json();
}

QUnit.test('get not empty data in from mockapi', async assert => {
  let temp;
  await getUsers().then(res => {
    if (res) temp = res;
  });
  assert.true(temp.length > 0, true, 'Result');
});

QUnit.test('render correct data', async assert => {
  let temp;
  const done = assert.async();
  await getUsers().then(res => {
    if (res) temp = res;
    done();
  });
  const [card] = document.getElementsByClassName('user');
  const [name] = card.getElementsByClassName('name');
  assert.equal(name.innerHTML, temp[0].name, 'Result');
});

QUnit.test('render show more button', async assert => {
  let temp;
  const done = assert.async();
  await getUsers().then(res => {
    if (res) temp = res;
    done();
  });
  const [card] = document.getElementsByClassName('user');
  const [button] = card.getElementsByClassName('button');
  assert.equal(button.innerHTML, 'Show more', 'Result');
});
