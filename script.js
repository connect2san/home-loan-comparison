document.getElementById('loanForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const currAmount = parseFloat(document.getElementById('currAmount').value);
  const currRate = parseFloat(document.getElementById('currRate').value) / 100;
  const currYears = parseFloat(document.getElementById('currYears').value);
  const currFreq = document.getElementById('currFreq').value;
  const currRepay = parseFloat(document.getElementById('currRepay').value);

  const newRate = parseFloat(document.getElementById('newRate').value) / 100;
  const newYears = parseFloat(document.getElementById('newYears').value);
  const cashback = parseFloat(document.getElementById('cashback').value);
  const annualFee = parseFloat(document.getElementById('annualFee').value);
  const benefits = parseFloat(document.getElementById('benefits').value);

  const freqMap = {
    weekly: 52,
    fortnightly: 26,
    monthly: 12
  };

  const periodsLeft = currYears * freqMap[currFreq];
  const totalCurrRepay = currRepay * periodsLeft;

  // Calculate new repayment
  const newFreq = freqMap[currFreq];
  const r = newRate / newFreq;
  const n = newYears * newFreq;
  const p = currAmount;

  const newEMI = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalNewRepay = (newEMI * n) - cashback + (annualFee * newYears) - benefits;

  const resultHTML = `
    <table>
      <tr><th>Item</th><th>Current Loan</th><th>New Loan</th></tr>
      <tr><td>Total Repayments</td><td>$${totalCurrRepay.toFixed(2)}</td><td>$${(newEMI * n).toFixed(2)}</td></tr>
      <tr><td>Cashback</td><td>-</td><td>$${cashback}</td></tr>
      <tr><td>Annual Fees (Total)</td><td>-</td><td>$${(annualFee * newYears).toFixed(2)}</td></tr>
      <tr><td>Additional Benefits</td><td>-</td><td>$${benefits}</td></tr>
      <tr><td><strong>Net Cost</strong></td><td><strong>$${totalCurrRepay.toFixed(2)}</strong></td><td><strong>$${totalNewRepay.toFixed(2)}</strong></td></tr>
      <tr><td><strong>You ${totalCurrRepay > totalNewRepay ? 'Save' : 'Lose'}</strong></td><td colspan="2"><strong>$${Math.abs(totalCurrRepay - totalNewRepay).toFixed(2)}</strong></td></tr>
    </table>
  `;

  document.getElementById('comparisonTable').innerHTML = resultHTML;
  document.getElementById('results').classList.remove('hidden');
});
