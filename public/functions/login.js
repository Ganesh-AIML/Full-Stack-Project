$(document).ready(function() {
    let isSignUp = false;

    $("#toggle-btn").click(function() {
        isSignUp = !isSignUp;

        if (isSignUp) {
            $("#form-title").text("Sign Up");
            $("#submit-btn").text("Sign Up");
            $("#welcome-text").text("Welcome!");
            $("#info-text").text("Already have an account?");
            $("#toggle-btn").text("Sign In");

            // Add confirm password field
            $("#confirm-password-container").html(`
                <label for="confirm-password">Confirm Password</label>
                <input id="confirm-password" type="password" name="confirmPassword" placeholder="Confirm Password" required>
            `);

            // Update form action
            $("#auth-form").attr("action", "/signup");

        } else {
            $("#form-title").text("Sign In");
            $("#submit-btn").text("Sign In");
            $("#welcome-text").text("Welcome Back!");
            $("#info-text").text("Don't have an account?");
            $("#toggle-btn").text("Sign Up");

            // Remove confirm password field
            $("#confirm-password-container").html("");

            // Update form action
            $("#auth-form").attr("action", "/login");
        }
    });

    // Form submission with password validation
    $("#auth-form").submit(function(e) {
        if (isSignUp) {
            const password = $("#password").val();
            const confirmPassword = $("#confirm-password").val();

            if (password !== confirmPassword) {
                e.preventDefault();
                alert("Passwords do not match!");
            }
        }
    });
});



$(document).ready(function() {
    // Open the forgot password modal
    $('#forgot-password-link').click(function(e) {
      e.preventDefault(); // Prevent link from jumping
      $('#forgot-password-modal').show(); // Show the modal
    });
  
    // Close the forgot password modal
    $('#close-modal').click(function() {
      $('#forgot-password-modal').hide(); // Hide the modal
    });
  });
  

