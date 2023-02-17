$(() => {
    const toast = (message, status) => {
        switch (status) {
            case "success":
                Toastify({
                    text: message,
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#32CD32",
                    },
                }).showToast();
                break;
            case "error":
                Toastify({
                    text: message,
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#FF5349",
                    },
                }).showToast();
                break;
        }
    };

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
    $(document).on("hidden.bs.modal", "#editProfileModal", function (e) {
        $(this).remove();
    });

    const emailPattern =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $(document).on("change", "#firstNameInput", (e) => {
        $(".firstName").remove();
        $("#firstNameInput").removeClass("is-invalid");
    });
    $(document).on("change", "#lastNameInput", (e) => {
        $(".lastName").remove();
        $("#lastNameInput").removeClass("is-invalid");
    });
    $(document).on("change", "#usernameInput", (e) => {
        $(".username").remove();
        $("#usernameInput").removeClass("is-invalid");
    });
    $(document).on("change", "#emailInput", (e) => {
        $(".email").remove();
        $("#emailInput").removeClass("is-invalid");
    });
    $(document).on("change", "#oldPasswordInput", (e) => {
        $(".oldPassword").remove();
        $("#oldPasswordInput").removeClass("is-invalid");
    });
    $(document).on("change", "#passwordInput", (e) => {
        $(".password").remove();
        $("#passwordInput").removeClass("is-invalid");
    });
    $(document).on("change", "#passwordConfirmInput", (e) => {
        $(".confirmPassword").remove();
        $("#passwordConfirmInput").removeClass("is-invalid");
    });
    $(document).on("change", "#oldPasswordInput", (e) => {
        $(".oldPassword").remove();
        $("#oldPasswordInput").removeClass("is-invalid");
    });
    $(document).on("change", "#imageInput", (e) => {
        $(".image").remove();
        $("#imageInput").removeClass("is-invalid");
    });
    $(document).on("change", "#titleInput", (e) => {
        $(".title").remove();
        $("#titleInput").removeClass("is-invalid");
    });
    $(document).on("change", "#descriptionInput", (e) => {
        $(".description").remove();
        $("#descriptionInput").removeClass("is-invalid");
    });
    $(document).on("change", "#authorInput", (e) => {
        $(".author").remove();
        $("#authorInput").removeClass("is-invalid");
    });
    $(document).on("change", "#quantityInput", (e) => {
        $(".quantity").remove();
        $("#quantityInput").removeClass("is-invalid");
    });
    /* End General Logic */

    /* Start Validation Register Logic */
    $(document).on("submit", "#register-form", function (e) {
        e.preventDefault();
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
        } else if (!emailPattern.test(email)) {
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
        }
        if (confirm_password === "") {
            confirm_passwordInput.addClass("is-invalid");
            $(".confirmPassword").remove();
            confirm_passwordInput.after(
                "<span class='confirmPassword invalid-feedback'>Confirm password is required</span>"
            );
            errors.push("Password is required");
        } else if (password !== confirm_password) {
            confirm_passwordInput.addClass("is-invalid");
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            $(".confirmPassword").remove();
            passwordInput.after(
                "<span class='password invalid-feedback'>Passwords do not match</span>"
            );
            confirm_passwordInput.after(
                "<span class='confirmPassword invalid-feedback'>Passwords do not match</span>"
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
        const errors = [];
        if (username === "") {
            usernameInput.addClass("is-invalid");
            $(".username").remove();
            usernameInput.after(
                "<span class='username invalid-feedback'>Username is required</span>"
            );
            errors.push("Username is required");
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

    /* Start Validation Reset Password Logic */
    $(document).on("submit", "#reset-password-form", function (e) {
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
        } else if (!emailPattern.test(email)) {
            emailInput.addClass("is-invalid");
            $(".email").remove();
            emailInput.after(
                "<span class='email invalid-feedback'>Email is invalid</span>"
            );
            errors.push("Email is invalid");
        }
        if (!errors.length) return e.currentTarget.submit();
    });
    /* End Validation Reset Password Logic */

    /* Start Validation Confirm Reset Password Logic */
    $(document).on("submit", "#confirm-reset-password-form", function (e) {
        e.preventDefault();
        const passwordInput = $("#passwordInput");
        const password = passwordInput.val();
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
        }
        if (confirm_password === "") {
            confirm_passwordInput.addClass("is-invalid");
            $(".confirmPassword").remove();
            confirm_passwordInput.after(
                "<span class='confirmPassword invalid-feedback'>Confirm password is required</span>"
            );
            errors.push("Password is required");
        } else if (password !== confirm_password) {
            confirm_passwordInput.addClass("is-invalid");
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            $(".confirmPassword").remove();
            passwordInput.after(
                "<span class='password invalid-feedback'>Passwords do not match</span>"
            );
            confirm_passwordInput.after(
                "<span class='confirmPassword invalid-feedback'>Passwords do not match</span>"
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
        const user_first_name = JSON.parse(
            document.getElementById("user_first_name").textContent
        );
        const user_last_name = JSON.parse(
            document.getElementById("user_last_name").textContent
        );
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
                                        value="${user_first_name}"
                                        placeholder="first name"
                                        name="first_name"
                                    />
                                </div>
                                <div class="col-sm-6">
                                    <label class="form-label">Last Name </label>
                                    <input
                                        type="text"
                                        id="lastNameInput"
                                        value="${user_last_name}"
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
            $.ajax({
                type: "POST",
                url: `/profile/update`,
                data: { first_name: firstName, last_name: lastName },
                success: function (res) {
                    if (res.status === "success") {
                        $("#displayName").html(
                            `${res.data.first_name} ${res.data.last_name}`
                        );
                        $("#editProfileModal").modal("hide");
                        toast("User Profile Updated Successfully", "success");
                    } else if (res.status === "error") {
                        toast("Something went wrong", "error");
                    }
                },
                error: function (jqXHR) {
                    console.log(jqXHR);
                },
            });
            // ;
        }
    });
    /* End Profile Logic */
    /* Start Account Logic */
    $(document).on("click", ".edit-account-username", function (e) {
        e.preventDefault();

        const user_username = JSON.parse(
            document.getElementById("user_username").textContent
        );
        const form = `<form class="account-username-form" role="form">
                            <!-- Start from row no 1 -->
                            <div class="row">
                                <div class="col-sm-12">
                                    <label class="form-label"
                                        >Username
                                    </label>
                                    <input
                                        type="text"
                                        value="${user_username}"
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
        const user_email = JSON.parse(
            document.getElementById("user_email").textContent
        );
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
                                        value="${user_email}"
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
                            <div class="row mb-3">
                                <div class="col-sm-12">
                                    <label class="form-label"
                                        >Old Password
                                    </label>
                                    <input
                                        type="password"
                                        id="oldPasswordInput"
                                        class=" form-control"
                                        placeholder="password"
                                    />
                                </div>
                            </div>
                            <!-- End from row no 1 -->
                            <!-- Start from row no 2 -->
                            <div class="row mb-3">
                                <div class="col-sm-12">
                                    <label class="form-label"
                                        >New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="passwordInput"
                                        class=" form-control"
                                        placeholder="password"
                                    />
                                </div>
                            </div>
                            <!-- End from row no 2 -->
                            <!-- Start from row no 3 -->
                            <div class="row mb-3">
                                <div class="col-sm-12">
                                    <label class="form-label"
                                        >Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="passwordConfirmInput"
                                        class=" form-control"
                                        placeholder="confirm password"
                                    />
                                </div>
                            </div>
                            <!-- End from row no 3 -->
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
            $.ajax({
                type: "POST",
                url: `/profile/update`,
                data: { username: username },
                success: function (res) {
                    if (res.status === "success") {
                        $("#username").html(res.data.username);
                        $("#editProfileModal").modal("hide");
                        toast("User Profile Updated Successfully", "success");
                    } else if (res.status === "error") {
                        const err = JSON.parse(res.error);
                        if (err?.username) {
                            usernameInput.addClass("is-invalid");
                            usernameInput.after(
                                `<span class='username invalid-feedback'>${err.username[0].message}</span>`
                            );
                        }
                        toast("Something went wrong", "error");
                    }
                },
                error: function (jqXHR) {
                    console.log(jqXHR);
                },
            });
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
        } else if (!emailPattern.test(email)) {
            emailInput.addClass("is-invalid");
            $(".email").remove();
            emailInput.after(
                "<span class='email invalid-feedback'>Email is invalid</span>"
            );
            errors.push("Email is invalid");
        }
        if (!errors.length) {
            $.ajax({
                type: "POST",
                url: `/profile/update`,
                data: { email: email },
                success: function (res) {
                    if (res.status === "success") {
                        $("#email").html(res.data.email);
                        $("#editProfileModal").modal("hide");
                        toast("User Profile Updated Successfully", "success");
                    } else if (res.status === "error") {
                        const err = JSON.parse(res.error);
                        emailInput.addClass("is-invalid");
                        $(".email").remove();
                        emailInput.after(
                            `<span class='email invalid-feedback'>${err?.email[0].message}</span>`
                        );
                        toast("Something went wrong", "error");
                    }
                },
                error: function (jqXHR) {
                    console.log(jqXHR);
                },
            });
        }
    });
    $(document).on("submit", ".account-password-form", function (e) {
        e.preventDefault();
        const oldPasswordInput = $("#oldPasswordInput");
        const oldPassword = oldPasswordInput.val();
        const passwordInput = $("#passwordInput");
        const password = passwordInput.val();
        const confirm_passwordInput = $("#passwordConfirmInput");
        const confirm_password = confirm_passwordInput.val();
        const errors = [];

        if (oldPassword === "") {
            oldPasswordInput.addClass("is-invalid");
            $(".password").remove();
            oldPasswordInput.after(
                "<span class='oldPassword invalid-feedback'>Old Password is required</span>"
            );
            errors.push("Password is required");
        }
        if (password === "") {
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            passwordInput.after(
                "<span class='password invalid-feedback'>Password is required</span>"
            );
            errors.push("Password is required");
        }
        if (confirm_password === "") {
            confirm_passwordInput.addClass("is-invalid");
            $(".confirmPassword").remove();
            confirm_passwordInput.after(
                "<span class='confirmPassword invalid-feedback'>Confirm password is required</span>"
            );
            errors.push("Password is required");
        } else if (password !== confirm_password) {
            confirm_passwordInput.addClass("is-invalid");
            passwordInput.addClass("is-invalid");
            $(".password").remove();
            $(".confirmPassword").remove();
            passwordInput.after(
                "<span class='password invalid-feedback'>Passwords do not match</span>"
            );
            confirm_passwordInput.after(
                "<span class='confirmPassword invalid-feedback'>Passwords do not match</span>"
            );
            errors.push("Passwords do not match");
        }
        if (!errors.length) {
            $.ajax({
                type: "POST",
                url: `/auth/api/password_change`,
                data: {
                    new_password2: confirm_password,
                    new_password1: password,
                    old_password: oldPassword,
                },
                success: function (res) {
                    if (res.status === "success") {
                        $("#editProfileModal").modal("hide");
                        toast("User Profile Updated Successfully", "success");
                    } else if (res.status === "error") {
                        const err = JSON.parse(res.error);
                        if (err?.old_password) {
                            oldPasswordInput.addClass("is-invalid");
                            $(".password").remove();
                            oldPasswordInput.after(
                                `<span class='oldPassword invalid-feedback'>${err.old_password[0].message}</span>`
                            );
                        }
                        if (err?.new_password1) {
                            passwordInput.addClass("is-invalid");
                            $(".password").remove();
                            passwordInput.after(
                                `<span class='password invalid-feedback'>${err.new_password1[0].message}</span>`
                            );
                        }
                        if (err?.new_password2) {
                            confirm_passwordInput.addClass("is-invalid");
                            $(".confirmPassword").remove();
                            confirm_passwordInput.after(
                                `<span class='confirmPassword invalid-feedback'>${err.new_password2[0].message}</span>`
                            );
                        }
                        toast("Something went wrong", "error");
                    }
                },
                error: function (jqXHR) {
                    console.log(jqXHR);
                },
            });
        }
    });
    /* End Account Logic */

    /* Start Issue Book Logic */
    $(document).on("click", "#issue-btn", function (e) {
        e.preventDefault();
        const bookId = $(this).data("id");
        const url = $(this).attr("href");
        if (bookId && url) {
            $.ajax({
                type: "post",
                url: url,
                data: {
                    book: bookId,
                },
                success: function (res) {
                    if (res.status === "success") {
                        $(document).find("#issue")
                            .html(`<p class="alert text-center alert-info">
                You already have an issue with this book
            </p>`);
                        toast("Book Issued Successfully", "success");
                    } else {
                        const err = JSON.parse(res.error);
                        if (err?.book) toast(err.book[0].message, "error");
                    }
                },
            });
        }
    });
    /* End Issue Book Logic */
    $(document).on("click", ".picture-uploader", function (e) {
        e.preventDefault();
        $(document).find("#imageInput").click();
    });
    $(document).on("change", "#imageInput", function (e) {
        const picture = $(this).prop("files")[0];
        if (picture) {
            const allowedExtensions = ["jpg", "jpeg", "png", "jfif"];
            if (picture.size > 4177920) {
                return toast(
                    "Image size must be lower 4MB, please choose a different image.",
                    "error"
                );
            } else if (
                !allowedExtensions.includes(picture.name.split(".").pop())
            ) {
                return toast("Allowed image extensions are jpg, jpeg, png, jfif",'error');
            }
            $(".profile-picture img").attr("src", URL.createObjectURL(picture));
            $(".profile-picture img").attr("alt", picture.name);
            const data = new FormData();
            data.append("picture", picture);
            if (picture) {
                $.ajax({
                    type: "POST",
                    url: "/profile/picture/update",
                    contentType: "multipart/form-data",
                    processData: false,
                    contentType: false,
                    data: data,
                    success: function (res) {
                        if (res.status === "success")
                            toast(res.message, "success");
                        else {
                            const err = JSON.parse(res.error);
                            if (err?.picture)
                                toast(err.picture[0].message, "error");
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    },
                });
            }
        }
    });
});
