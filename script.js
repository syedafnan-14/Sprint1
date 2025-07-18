
        // Page navigation
        function showPage(pageName) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.style.display = 'none';
            });
            
            // Show the requested page
            document.getElementById(pageName + '-page').style.display = 'block';
            
            // Update active menu item
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Set active class for the current page
            if(pageName === 'home') {
                document.querySelector('.nav-link[onclick="showPage(\'home\')"]').classList.add('active');
            } else if(pageName === 'pay-bill' || pageName === 'payment' || pageName === 'payment-success') {
                document.querySelector('.nav-link[onclick="showPage(\'pay-bill\')"]').classList.add('active');
            } else if(pageName === 'register-complaint' || pageName === 'complaint-success') {
                document.querySelector('.nav-link[onclick="showPage(\'register-complaint\')"]').classList.add('active');
            } else if(pageName === 'complaint-status') {
                document.querySelector('.nav-link[onclick="showPage(\'complaint-status\')"]').classList.add('active');
            }
        }
        
        // Logout function
function logout() {
    // Remove logged-in user from localStorage
    localStorage.removeItem('bijliseva_logged_in_user');

    // Redirect to login page
    window.location.href = "login.html"; // or "login.html" if you've renamed it
}
        
        // Bill calculation
function calculateTotal() {
    const bills = document.querySelectorAll('.bill-checkbox');
    let billAmount = 0;
    let lateFee = 0;
    const pgCharges = 15;

    bills.forEach(bill => {
        if (bill.checked) {
            const billItem = bill.closest('.bill-item');
            const amountText = billItem.querySelector('.bill-amount').textContent;
            const amount = parseFloat(amountText.replace('₹', '').replace(',', '').trim());
            billAmount += amount;

            const dueText = billItem.querySelector('.bill-due').textContent;
            if (dueText.includes('Overdue')) {
                lateFee += 100; // ₹100 late fee per overdue bill
            }
        }
    });

    const totalPayable = billAmount + lateFee + pgCharges;

    // Update display on current page
    document.getElementById('bill-amount').textContent = `₹ ${billAmount.toFixed(2)}`;
    document.getElementById('late-fee').textContent = `₹ ${lateFee.toFixed(2)}`;
    document.getElementById('total-payable').textContent = `₹ ${totalPayable.toFixed(2)}`;

    // Save values to localStorage for payment page
    localStorage.setItem('billAmount', billAmount.toFixed(2));
    localStorage.setItem('lateFee', lateFee.toFixed(2));
    localStorage.setItem('pgCharges', pgCharges.toFixed(2));
    localStorage.setItem('totalPayable', totalPayable.toFixed(2));
}

function updateBillDetails() {
    const billAmount = localStorage.getItem('billAmount') || '0.00';
    const lateFee = localStorage.getItem('lateFee') || '0.00';
    const pgCharges = localStorage.getItem('pgCharges') || '0.00';
    const totalPayable = localStorage.getItem('totalPayable') || '0.00';

    document.getElementById('payment-bill-amount').textContent = `₹ ${billAmount}`;
    document.getElementById('payment-late-fee').textContent = `₹ ${lateFee}`;
    document.getElementById('payment-total-payable').textContent = `₹ ${totalPayable}`;
}
          
 
        // Payment method selection
        document.getElementById('payment-method').addEventListener('change', function() {
            const method = this.value;
            const cardDetails = document.getElementById('card-details');
            
            if(method === 'credit' || method === 'debit') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
        
        // Process payment
        function processPayment() {
            const method = document.getElementById('payment-method').value;
            
            if(!method) {
                alert('Please select a payment method');
                return;
            }
            
            if(method === 'credit' || method === 'debit') {
                const cardNumber = document.getElementById('card-number').value;
                const cardName = document.getElementById('card-name').value;
                const cardExpiry = document.getElementById('card-expiry').value;
                const cardCvv = document.getElementById('card-cvv').value;
                
                if(!cardNumber || cardNumber.length < 16) {
                    alert('Please enter a valid 16-digit card number');
                    return;
                }
                
                if(!cardName || cardName.length < 5) {
                    alert('Please enter the card holder name');
                    return;
                }
                
                if(!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
                    alert('Please enter a valid expiry date in MM/YY format');
                    return;
                }
                
                if(!cardCvv || cardCvv.length < 3) {
                    alert('Please enter a valid 3-digit CVV');
                    return;
                }
            }
            localStorage.setItem('paymentMethod', document.getElementById('payment-method').value);

            // If all validations pass, show success page
            window.location.href = "payment-success.html";

            showPage('payment-success');
        }
        
        
        
        // Submit complaint
function submitComplaint() {
  const complaintType = document.getElementById('complaint-type').value;
  const category = document.getElementById('complaint-category').value;
  const contactPerson = document.getElementById('contact-person').value;
  const consumerId = document.getElementById('complaint-consumer-id').value;
  const mobile = document.getElementById('complaint-mobile').value;
  const description = document.getElementById('problem-description').value;

  if (!complaintType || !category || !contactPerson || !consumerId || !mobile || !description) {
    alert('Please fill in all the required fields.');
    return;
  }

  if (consumerId.length !== 13 || mobile.length !== 10) {
    alert('Please enter valid Consumer ID and Mobile Number.');
    return;
  }

  const complaintId = "COMP" + Date.now();
  const newComplaint = {
    id: complaintId,
    type: complaintType,
    category: category,
    contact: contactPerson,
    mobile: mobile,
    description: description,
    status: "In Progress"
  };

  // Get existing complaints
  const existing = JSON.parse(localStorage.getItem("complaints") || "[]");

  // Add new complaint
  existing.push(newComplaint);
  localStorage.setItem("complaints", JSON.stringify(existing));

  // Save latest to show in success page
  localStorage.setItem("complaintId", complaintId);
  localStorage.setItem("complaintType", complaintType);
  localStorage.setItem("complaintCategory", category);
  localStorage.setItem("complaintContact", contactPerson);
  localStorage.setItem("complaintMobile", mobile);

  // Redirect to success page
  window.location.href = "complaint-success.html";
}


        
        // Reset complaint form
        function resetComplaintForm() {
            document.getElementById('complaint-type').value = '';
            document.getElementById('complaint-category').value = '';
            document.getElementById('contact-person').value = '';
            document.getElementById('landmark').value = '';
            document.getElementById('complaint-consumer-id').value = '';
            document.getElementById('complaint-mobile').value = '';
            document.getElementById('problem-description').value = '';
            document.getElementById('complaint-address').value = '';
        }
        
        // View complaint details
        function viewComplaintDetails() {
            alert('Complaint details would be shown here in a real application.');
        }
        
        // Initialize page
        window.onload = function() {
            showPage('home');
        };

        function downloadReceipt() {
    const txnId = localStorage.getItem('transactionId') || "TXN" + Date.now();
    const amount = localStorage.getItem('totalPayable') || "0.00";
    const method = localStorage.getItem('paymentMethod') || "N/A";
    const consumerId = localStorage.getItem('consumerId') || "1234567890123";
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB');
    const timeStr = now.toLocaleTimeString('en-IN');

    const content = `
      BijliSeva - Payment Receipt

      Transaction ID: ${txnId}
      Consumer ID: ${consumerId}
      Date: ${dateStr}
      Time: ${timeStr}
      Amount Paid: ₹ ${amount}
      Payment Method: ${method}

      Thank you for your payment!
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Receipt_${txnId}.txt`;
    a.click();
}

    