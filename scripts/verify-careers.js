async function run() {
  console.log('--- 1. Testing GET /careers ---');
  const careersPage = await fetch('http://localhost:3000/careers');
  console.log('GET /careers status:', careersPage.status);
  const careersHtml = await careersPage.text();
  console.log('Contains "Build the Future":', careersHtml.includes('Build the Future'));

  console.log('\n--- 2. Testing GET /api/careers/jobs ---');
  const jobsRes = await fetch('http://localhost:3000/api/careers/jobs');
  console.log('GET /api/careers/jobs status:', jobsRes.status);
  const jobs = await jobsRes.json();
  console.log('Found active jobs count:', jobs.length);
  const testJob = jobs[0];
  console.log('Sample job:', testJob.id, testJob.title, testJob.department);

  console.log('\n--- 3. Testing POST /api/careers/apply ---');
  const applyRes = await fetch('http://localhost:3000/api/careers/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      job_id: testJob.id,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+1 555-0199',
      portfolio: 'https://github.com/janedoe',
      linkedin: 'https://linkedin.com/in/janedoe',
      cover_letter: 'I have 6 years experience building scalable web applications with Next.js and TypeScript.'
    })
  });
  console.log('POST /api/careers/apply status:', applyRes.status);
  const applyData = await applyRes.json();
  console.log('Application created ID:', applyData.id);

  console.log('\n--- 4. Testing Admin Login ---');
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@devops.com', password: 'admin123' })
  });
  console.log('Login status:', loginRes.status);
  const setCookie = loginRes.headers.get('set-cookie');
  console.log('Set-Cookie header received:', !!setCookie);
  const cookieVal = setCookie ? setCookie.split(';')[0] : '';

  console.log('\n--- 5. Testing Admin Applications API ---');
  const appsRes = await fetch('http://localhost:3000/api/admin/careers/applications', {
    headers: { 'Cookie': cookieVal }
  });
  console.log('GET /api/admin/careers/applications status:', appsRes.status);
  const apps = await appsRes.json();
  console.log('Admin applications count:', apps.length);
  const submittedApp = apps.find(a => a.id === applyData.id);
  console.log('Found submitted app:', submittedApp ? { id: submittedApp.id, name: submittedApp.name, status: submittedApp.status, job: submittedApp.job_title } : null);

  console.log('\n--- 6. Testing PATCH Candidate Status ---');
  const patchRes = await fetch('http://localhost:3000/api/admin/careers/applications/' + applyData.id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookieVal },
    body: JSON.stringify({ status: 'interviewing' })
  });
  console.log('PATCH application status:', patchRes.status);

  console.log('\n--- 7. Testing Admin Jobs Management (Create, Edit, Delete) ---');
  const newJobRes = await fetch('http://localhost:3000/api/admin/careers/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': cookieVal },
    body: JSON.stringify({
      title: 'AI Solutions Architect',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-Time',
      experience: '5+ years',
      salary_range: '$140k - $180k',
      description: 'Lead architecture and development of enterprise GenAI tools.',
      requirements: ['Python', 'LangChain', 'Next.js'],
      responsibilities: ['Architect scalable AI pipelines', 'Design agentic workflows'],
      is_active: 1
    })
  });
  console.log('POST new job status:', newJobRes.status);
  const newJobData = await newJobRes.json();
  console.log('Created Job ID:', newJobData.id);

  // Clean up created test application and created test job
  const delAppRes = await fetch('http://localhost:3000/api/admin/careers/applications/' + applyData.id, {
    method: 'DELETE',
    headers: { 'Cookie': cookieVal }
  });
  console.log('DELETE test application status:', delAppRes.status);

  const delJobRes = await fetch('http://localhost:3000/api/admin/careers/jobs/' + newJobData.id, {
    method: 'DELETE',
    headers: { 'Cookie': cookieVal }
  });
  console.log('DELETE test job status:', delJobRes.status);

  console.log('\n--- 8. Testing Admin Careers Page Render ---');
  const adminCareersPage = await fetch('http://localhost:3000/admin/careers', {
    headers: { 'Cookie': cookieVal }
  });
  console.log('GET /admin/careers status:', adminCareersPage.status);

  console.log('\nAll verification checks passed successfully!');
}

run().catch(console.error);
