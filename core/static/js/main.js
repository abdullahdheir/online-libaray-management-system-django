$(() => {
    /* Start General Logic */
    $("#dataTable").DataTable({
        columnDefs: [
            { orderable: true, className: "reorder", targets: 0 },
            { orderable: false, targets: "_all" },
        ],
    });
    const modal = (title, form) => {
        const html = `<div
            class="modal fade"
            id="editProfileModal"
            tabindex="-1"
            aria-labelledby="editProfileModal"
            aria-hidden="false"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editProfileLabel">
                            ${title}
                        </h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        ${form}
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" id="submit-btn" class="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        $("body").append(html);
        $("#editProfileModal").modal("show");
    };

    const hideModal = () =>
        $(document).on("hidden.bs.modal", "#editProfileModal", function (e) {
            e.preventDefault();
            $(this).remove();
        });

    $("#firstNameInput").keydown((e) => {
        $(".firstName").remove();
        $("#firstNameInput").removeClass("is-invalid");
    });
    $("#lastNameInput").keydown((e) => {
        $(".lastName").remove();
        $("#lastNameInput").removeClass("is-invalid");
    });
    $("#usernameInput").keydown((e) => {
        $(".username").remove();
        $("#usernameInput").removeClass("is-invalid");
    });
    $("#emailInput").keydown((e) => {
        $(".email").remove();
        $("#emailInput").removeClass("is-invalid");
    });
    $("#passwordInput").keydown((e) => {
        $(".password").remove();
        $("#passwordInput").removeClass("is-invalid");
        $("#passwordConfirmInput").removeClass("is-invalid");
    });
    $("#passwordConfirmInput").keydown((e) => {
        $(".passwordConfirm").remove();
        $("#passwordConfirmInput").removeClass("is-invalid");
    });
    $("#imageInput").change((e) => {
        $(".image").remove();
        $("#imageInput").removeClass("is-invalid");
    });
    $("#titleInput").keydown((e) => {
        $(".title").remove();
        $("#titleInput").removeClass("is-invalid");
    });
    $("#descriptionInput").keydown((e) => {
        $(".description").remove();
        $("#descriptionInput").removeClass("is-invalid");
    });
    $("#authorInput").keydown((e) => {
        $(".author").remove();
        $("#authorInput").removeClass("is-invalid");
    });
    $("#quantityInput").keydown((e) => {
        $(".quantity").remove();
        $("#quantityInput").removeClass("is-invalid");
    });
    /* End General Logic */

    /* Start Validation Register Logic */
    $(document).on("submit", "#register-form", function (e) {
        e.preventDefault();
        const emailPattern =
            /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/i;
        const firstNameInput = $("#firstNameInput");
        const firstName = firstNameInput.val();
        const usernameInput = $("#usernameInput");
        const emailInput = $("#emailInput");
        const passwordInput = $("#passwordInput");
        const confirm_passwordInput = $("#passwordConfirmInput");
        const lastNameInput = $("#lastNameInput");
        const lastName = lastNameInput.val();
        const username = usernameInput.val();
        const email = emailInput.val();
        const password = passwordInput.val();
        const confirm_password = confirm_passwordInput.val();
        const errors = [];

        if (firstName === "") {
            firstNameInput.addClass("is-invalid");
            $(".firstName").remove();
            firstNameInput.after(
                "<span class='firstName invalid-feedback'>First name is required</span>"
            );
            errors.push("First name is required");
        }
        if (lastName === "") {
            lastNameInput.addClass("is-invalid");
            $(".lastName").remove();
            lastNameInput.after(
                "<span class='lastName invalid-feedback'>Last name is required</span>"
            );
            errors.push("Last name is required");
        }
        if (username === "") {
            usernameInput.addClass("is-invalid");
            $(".username").remove();
            usernameInput.after(
                "<span class='username invalid-feedback'>Username is required</span>"
            );
            errors.push("Username is required");
        } else if (username.length < 4) {
            usernameInput.addClass("is-invalid");
            $(".username").remove();
            usernameInput.after(
                "<span class='username invalid-feedback'>Username must be at least 4 characters</span>"
            );
            errors.push("Username must be at least 4 characters");
        }
        if (email === "") {
            emailInput.addClass("is-invalid");
            $(".email").remove();
            emailInput.after(
                "<span class='email invalid-feedback'>Email is required</span>"
            );
            errors.push("Email is required");
        } else if (emailPattern.test(email)) {
            emailInput.addClass("is-invalid");
            $(".email").remove();
            emailInput.after(
                "<span class='email invalid-feedback'>Email is invalid</span>"
            );
            errors.push("Email is invalid");
        }

        if (password === "") {
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            passwordInput.after(
                "<span class='password invalid-feedback'>Password is required</span>"
            );
            errors.push("Password is required");
        } else if (password !== confirm_password) {
            confirm_passwordInput.addClass("is-invalid");
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            confirm_passwordInput.after(
                "<span class='password invalid-feedback'>Passwords do not match</span>"
            );
            errors.push("Passwords do not match");
        }
        if (!errors.length) return e.currentTarget.submit();
    });
    /* End Validation Register Logic */

    /* Start Validation Login Logic */
    $(document).on("submit", "#login-form", function (e) {
        e.preventDefault();
        const usernameInput = $("#usernameInput");
        const passwordInput = $("#passwordInput");
        const username = usernameInput.val();
        const password = passwordInput.val();

        if (username === "") {
            usernameInput.addClass("is-invalid");
            $(".username").remove();
            usernameInput.after(
                "<span class='username invalid-feedback'>Username is required</span>"
            );
            errors.push("Username is required");
        } else if (username.length < 4) {
            usernameInput.addClass("is-invalid");
            $(".username").remove();
            usernameInput.after(
                "<span class='username invalid-feedback'>Username must be at least 4 characters</span>"
            );
            errors.push("Username must be at least 4 characters");
        }
        if (password === "") {
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            passwordInput.after(
                "<span class='password invalid-feedback'>Password is required</span>"
            );
            errors.push("Password is required");
        }
        if (!errors.length) return e.currentTarget.submit();
    });
    /* End Validation Login Logic */

    /* Start Validation Forget Password Logic */
    $(document).on("submit", "#forget-password-form", function (e) {
        e.preventDefault();
        const emailPattern =
            /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/i;
        const emailInput = $("#emailInput");
        const email = emailInput.val();

        if (email === "") {
            emailInput.addClass("is-invalid");
            $(".email").remove();
            emailInput.after(
                "<span class='email invalid-feedback'>Email is required</span>"
            );
            errors.push("Email is required");
        } else if (emailPattern.test(email)) {
            emailInput.addClass("is-invalid");
            $(".email").remove();
            emailInput.after(
                "<span class='email invalid-feedback'>Email is invalid</span>"
            );
            errors.push("Email is invalid");
        }
        if (!errors.length) return e.currentTarget.submit();
    });
    /* End Validation Forget Password Logic */

    /* Start Validation Reset Password Logic */
    $(document).on("submit", "#reset-password-form", function (e) {
        e.preventDefault();
        const passwordInput = $("#passwordInput");
        const password = passwordInput.val();
        const confirm_passwordInput = $("#passwordConfirmInput");
        const confirm_password = confirm_passwordInput.val();
        if (password === "") {
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            passwordInput.after(
                "<span class='password invalid-feedback'>Password is required</span>"
            );
            errors.push("Password is required");
        } else if (password !== confirm_password) {
            confirm_passwordInput.addClass("is-invalid");
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            confirm_passwordInput.after(
                "<span class='password invalid-feedback'>Passwords do not match</span>"
            );
            errors.push("Passwords do not match");
        }
        if (!errors.length) return e.currentTarget.submit();
    });
    /* End Validation Reset Password Logic */
    /* Start Dashboard Logic */
    $(".toggle-icon").on("click", function (e) {
        $(this).toggleClass("closed");
        $(this).parent().parent().next().slideToggle();
        if ($(this).hasClass("closed"))
            $(this).html(`<i class="fas fa-plus"></i>`);
        else $(this).html(`<i class="fas fa-minus"></i>`);
    });
    /* End Dashboard Logic */
    /* Start Validation Add Book Logic */
    $(document).on("submit", "#add-book-form", function (e) {
        e.preventDefault();
        const imageInput = $("#imageInput");
        const image = imageInput.prop("files");
        const titleInput = $("#titleInput");
        const title = titleInput.val();
        const descriptionInput = $("#descriptionInput");
        const description = descriptionInput.val();
        const authorInput = $("#authorInput");
        const author = authorInput.val();
        const quantityInput = $("#quantityInput");
        const quantity = authorInput.val();
        const errors = [];
        if (!image.length) {
            imageInput.addClass("is-invalid");
            $(".image").remove();
            imageInput.after(
                "<span class='image invalid-feedback'>Image is required</span>"
            );
            errors.push("Title is required");
        }
        if (title === "") {
            titleInput.addClass("is-invalid");
            $(".title").remove();
            titleInput.after(
                "<span class='title invalid-feedback'>Title is required</span>"
            );
            errors.push("Title is required");
        }
        if (description === "") {
            descriptionInput.addClass("is-invalid");
            $(".description").remove();
            descriptionInput.after(
                "<span class='description invalid-feedback'>Description is required</span>"
            );
            errors.push("Description is required");
        }
        if (author === "") {
            authorInput.addClass("is-invalid");
            $(".author").remove();
            authorInput.after(
                "<span class='author invalid-feedback'>Author do not match</span>"
            );
            errors.push("Author is required");
        }
        if (quantity === "") {
            quantityInput.addClass("is-invalid");
            $(".quantity").remove();
            quantityInput.after(
                "<span class='quantity invalid-feedback'>Quantity do not match</span>"
            );
            errors.push("Quantity is required");
        }
        if (!errors.length) return e.currentTarget.submit();
    });
    /* End Validation Add Book Logic */
    /* Start Profile Logic */
    $(document).on("click", "#submit-btn", function (e) {
        e.preventDefault();
        $(this).parent().parent().find("form").submit();
    });

    $(document).on("click", ".edit-profile-main", function (e) {
        e.preventDefault();
        const form = `<form class="profile-main-form" role="form">
                            <!-- Start from row no 1 -->
                            <div class="row">
                                <div class="col-sm-6">
                                    <label class="form-label"
                                        >First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstNameInput"
                                        class="mb-3 form-control"
                                        placeholder="first name"
                                        name="first_name"
                                    />
                                </div>
                                <div class="col-sm-6">
                                    <label class="form-label">Last Name </label>
                                    <input
                                        type="text"
                                        id="lastNameInput"
                                        class="mb-3 form-control"
                                        placeholder="last name"
                                        name="last_name"
                                    />
                                </div>
                            </div>
                        </form>`;
        modal("Edit Profile", form);
    });

    $(document).on("submit", ".profile-main-form", function (e) {
        e.preventDefault();
        const firstNameInput = $("#firstNameInput");
        const firstName = firstNameInput.val();
        const lastNameInput = $("#lastNameInput");
        const lastName = lastNameInput.val();
        const errors = [];

        if (firstName === "") {
            firstNameInput.addClass("is-invalid");
            $(".firstName").remove();
            firstNameInput.after(
                "<span class='firstName invalid-feedback'>First name is required</span>"
            );
            errors.push("First name is required");
        }
        if (lastName === "") {
            lastNameInput.addClass("is-invalid");
            $(".lastName").remove();
            lastNameInput.after(
                "<span class='lastName invalid-feedback'>Last name is required</span>"
            );
            errors.push("Last name is required");
        }
        if (!errors.length) {
            hideModal();
        }
    });
    /* End Profile Logic */
    /* Start Account Logic */
    $(document).on("click", ".edit-account-username", function (e) {
        e.preventDefault();
        const form = `<form class="account-username-form" role="form">
                            <!-- Start from row no 1 -->
                            <div class="row">
                                <div class="col-sm-12">
                                    <label class="form-label"
                                        >Username
                                    </label>
                                    <input
                                        type="text"
                                        id="usernameInput"
                                        class="mb-3 form-control"
                                        placeholder="username"
                                    />
                                </div>
                            </div>
                            <!-- End from row no 1 -->
                        </form>`;
        modal("Edit Username", form);
    });
    $(document).on("click", ".edit-account-email", function (e) {
        e.preventDefault();
        const form = `<form class="account-email-form" role="form">
                            <!-- Start from row no 1 -->
                            <div class="row">
                                <div class="col-sm-12">
                                    <label class="form-label"
                                        >Email
                                    </label>
                                    <input
                                        type="email"
                                        id="emailInput"
                                        class="mb-3 form-control"
                                        placeholder="email"
                                    />
                                </div>
                            </div>
                            <!-- End from row no 1 -->
                        </form>`;
        modal("Edit Email", form);
    });
    $(document).on("click", ".edit-account-password", function (e) {
        e.preventDefault();
        const form = `<form class="account-password-form" role="form">
                            <!-- Start from row no 1 -->
                            <div class="row">
                                <div class="col-sm-12">
                                    <label class="form-label"
                                        >Password
                                    </label>
                                    <input
                                        type="password"
                                        id="passwordInput"
                                        class="mb-3 form-control"
                                        placeholder="password"
                                    />
                                </div>
                            </div>
                            <!-- End from row no 1 -->
                            <!-- Start from row no 2 -->
                            <div class="row">
                                <div class="col-sm-12">
                                    <label class="form-label"
                                        >Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPasswordInput"
                                        class="mb-3 form-control"
                                        placeholder="confirm password"
                                    />
                                </div>
                            </div>
                            <!-- End from row no 2 -->
                        </form>`;
        modal("Edit Password", form);
    });

    $(document).on("submit", ".account-username-form", function (e) {
        e.preventDefault();
        const usernameInput = $("#usernameInput");
        const username = usernameInput.val();

        const errors = [];

        if (username === "") {
            usernameInput.addClass("is-invalid");
            $(".username").remove();
            usernameInput.after(
                "<span class='username invalid-feedback'>Username is required</span>"
            );
            errors.push("Username is required");
        } else if (username.length < 4) {
            usernameInput.addClass("is-invalid");
            $(".username").remove();
            usernameInput.after(
                "<span class='username invalid-feedback'>Username must be at least 4 characters</span>"
            );
            errors.push("Username must be at least 4 characters");
        }

        if (!errors.length) {
            hideModal();
        }
    });
    $(document).on("submit", ".account-email-form", function (e) {
        e.preventDefault();
        const emailInput = $("#emailInput");
        const email = emailInput.val();
        const errors = [];

        if (email === "") {
            emailInput.addClass("is-invalid");
            $(".email").remove();
            emailInput.after(
                "<span class='email invalid-feedback'>Email is required</span>"
            );
            errors.push("Email is required");
        } else if (emailPattern.test(email)) {
            emailInput.addClass("is-invalid");
            $(".email").remove();
            emailInput.after(
                "<span class='email invalid-feedback'>Email is invalid</span>"
            );
            errors.push("Email is invalid");
        }
        if (!errors.length) {
            hideModal();
        }
    });
    $(document).on("submit", ".account-email-form", function (e) {
        e.preventDefault();
        const password = passwordInput.val();
        const passwordInput = $("#passwordInput");
        const confirm_passwordInput = $("#passwordConfirmInput");
        const confirm_password = confirm_passwordInput.val();
        const errors = [];

        if (password === "") {
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            passwordInput.after(
                "<span class='password invalid-feedback'>Password is required</span>"
            );
            errors.push("Password is required");
        } else if (password !== confirm_password) {
            confirm_passwordInput.addClass("is-invalid");
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            confirm_passwordInput.after(
                "<span class='password invalid-feedback'>Passwords do not match</span>"
            );
            errors.push("Passwords do not match");
        }
        if (!errors.length) {
            hideModal();
        }
    });
    /* End Account Logic */

    hideModal();
});
