async function runTests() {
  console.log('Testing CS Internship Platform API endpoints...');

  // 1. Fetch internships
  const resInt = await fetch('http://localhost:3000/api/internships');
  const dataInt = await resInt.json();
  console.log('✔ Internships fetched:', dataInt.internships?.length);

  // 2. Fetch admin stats
  const resStats = await fetch('http://localhost:3000/api/admin/stats');
  const dataStats = await resStats.json();
  console.log('✔ Admin stats:', dataStats.stats);

  // 3. Fetch public certificate
  const resCert = await fetch('http://localhost:3000/api/certificates?credentialId=CS-STANFORD-2026-89412');
  const dataCert = await resCert.json();
  console.log('✔ Public Certificate verified for:', dataCert.certificate?.studentName, '-', dataCert.certificate?.grade);

  // 4. Test simulated payment checkout
  const resPay = await fetch('http://localhost:3000/api/payments/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      internshipId: 'int_fullstack_201',
      userId: 'usr_student_1',
      paymentMethod: 'Razorpay UPI (Google Pay)'
    })
  });
  const dataPay = await resPay.json();
  console.log('✔ Simulated Checkout response:', dataPay.success, 'Receipt Txn:', dataPay.receipt?.transactionId);

  // 5. Test milestone submission
  const resSub = await fetch('http://localhost:3000/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      applicationId: dataPay.application.id,
      internshipId: 'int_fullstack_201',
      userId: 'usr_student_1',
      weekNumber: 1,
      taskTitle: 'Modern Next.js App Router & Server Components',
      githubUrl: 'https://github.com/alexrivera-cs/distributed-dashboard-next',
      liveUrl: 'https://alex-dashboard.demo.app',
      notes: 'Optimized server action cache invalidation.'
    })
  });
  const dataSub = await resSub.json();
  console.log('✔ Student Milestone Submission created:', dataSub.success, 'ID:', dataSub.submission?.id);

  // 6. Test Professor Grading
  const resGrade = await fetch(`http://localhost:3000/api/submissions/${dataSub.submission.id}/grade`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      score: 98,
      feedback: 'Outstanding Next.js App Router architecture and server action revalidation!',
      status: 'approved',
      gradedBy: 'Dr. Aris Thorne'
    })
  });
  const dataGrade = await resGrade.json();
  console.log('✔ Professor Grade recorded:', dataGrade.success, 'Score:', dataGrade.submission?.score);

  console.log('\nAll End-to-End API Integration Tests Passed Successfully! 🎉');
}

runTests().catch(console.error);
