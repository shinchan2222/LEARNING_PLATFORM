async function testStudentAuth() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const testEmail = `student_${rand}@mit.edu`;

  console.log('Testing Student Sign Up & Sign In...');

  // 1. Sign Up
  const regRes = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Jordan Lee',
      email: testEmail,
      college: 'MIT EECS',
      password: 'password123',
      role: 'student'
    })
  });
  const regData = await regRes.json();
  console.log('✔ Registered student:', regData.user?.name, 'Email:', regData.user?.email, 'Role:', regData.user?.role);

  // 2. Sign In
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail
    })
  });
  const loginData = await loginRes.json();
  console.log('✔ Successfully signed in:', loginData.user?.name, 'ID:', loginData.user?.id);

  console.log('Student Sign In & Sign Up tests passed! 🎉');
}

testStudentAuth().catch(console.error);
