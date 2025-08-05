document.querySelectorAll(".tbo_promotion_form").forEach((formEl) => {
  if (formEl) {
    new FormValidator(formEl, {
      onSuccess: () => {
        const $form = $(formEl);
        const page_type = $("#page_type").val();

        // Disable button
        $form.find(".vr_submit_promotion").css({
          "pointer-events": "none",
          "background-color": "#117fa58a",
        });

        sessionStorage.setItem("page_type", page_type);
        $("#promotion_loader").show();

        $.ajax({
          type: "POST",
          url: "/theboringoffice/wp-admin/admin-ajax.php",
          data: {
            action: "tbo_promotions_page_submission",
            records: $form.serialize(),
          },
          success: function (data) {
            try {
              const response = JSON.parse(data);

              // Reset only the current form
              $form[0].reset();

              // Re-enable the button
              $form.find(".vr_submit_promotion").css({
                "pointer-events": "unset",
                "background-color": "#fff",
              });

              $("#promotion_loader").hide();
              window.location.href = "/theboringoffice/thank-you/";
            } catch (err) {
              console.error("Invalid JSON response", data);
            }
          },
          error: function (xhr, status, error) {
            console.error("AJAX error", status, error);
            $form.find(".vr_submit_promotion").css({
              "pointer-events": "unset",
              "background-color": "#fff",
            });
            $("#promotion_loader").hide();
          },
        });
      },
    });
  }
});
