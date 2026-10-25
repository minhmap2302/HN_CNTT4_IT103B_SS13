
let bookings = [
    {
        bookingCode: "CIN-001",
        customerName: "Nguyễn Văn An",
        movieTitle: "Ánh Trăng Cuối Phố",
        ticketCount: 2,
        pricePerTicket: 90000,
        totalAmount: 194400
    },
    {
        bookingCode: "CIN-002",
        customerName: "Trần Thị Bình",
        movieTitle: "Biệt Đội Sao Băng",
        ticketCount: 4,
        pricePerTicket: 90000,
        totalAmount: 349920
    },
    {
        bookingCode: "CIN-003",
        customerName: "Lê Minh Châu",
        movieTitle: "Mùa Hè Rực Lửa",
        ticketCount: 6,
        pricePerTicket: 110000,
        totalAmount: 641520
    }
];

function findBookingIndex(code) {
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].bookingCode === code) {
            return i;
        }
    }
    return -1;
}

function validateBookingCode(code) {
    if (code === null) {
        return "Chưa nhập mã đặt vé";
    }

    code = code.trim().toUpperCase();

    if (code === "") {
        return "Chưa nhập mã đặt vé";
    }
    if (code.length < 6) {
        return "Độ dài nhỏ hơn 6 ký tự";
    }
    if (!code.startsWith("CIN-")) {
        return 'Sai tiền tố "CIN-"';
    }
    if (code.includes(" ") || code.includes("\t") || code.includes("\n")) {
        return "Chứa khoảng trắng";
    }
    if (findBookingIndex(code) !== -1) {
        return "Mã đặt vé đã tồn tại";
    }
    return "";
}

function inputPositiveInteger(message) {
    while (true) {
        let value = prompt(message);
        if (value === null) {
            return null;
        }

        value = value.trim();
        let number = Number(value);

        if (value !== "" && Number.isInteger(number) && number > 0) {
            return number;
        }
        console.log("Vui lòng nhập số nguyên lớn hơn 0!");
    }
}

function calculateTotal(ticketCount, pricePerTicket) {
    let baseCost = ticketCount * pricePerTicket;
    let discount = 0;

    if (ticketCount >= 4) {
        discount = Math.round(baseCost * 0.1);
    }

    let serviceFee = Math.round((baseCost - discount) * 0.08);
    let totalAmount = baseCost - discount + serviceFee;

    return { baseCost, discount, serviceFee, totalAmount };
}

function formatMoney(amount) {
    return amount.toLocaleString("vi-VN") + " VNĐ";
}

// Viet hoa chu cai dau moi tu va bo khoang trang thua.
function capitalizeWords(text) {
    let words = text.trim().toLowerCase().split(" ");
    let result = "";

    for (let i = 0; i < words.length; i++) {
        if (words[i] !== "") {
            if (result !== "") {
                result += " ";
            }
            result += words[i][0].toUpperCase() + words[i].slice(1);
        }
    }
    return result;
}

function inputName(message) {
    while (true) {
        let value = prompt(message);
        if (value === null) {
            return null;
        }

        value = value.trim();
        if (value !== "") {
            return capitalizeWords(value);
        }
        console.log("Không được để trống. Vui lòng nhập lại!");
    }
}

function displayBookings(list) {
    if (list.length === 0) {
        console.log("Danh sách đơn đặt vé trống");
        return;
    }

    let revenue = 0;
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        console.log(
            (i + 1) + ". " + item.bookingCode + " - " + item.customerName +
            " - " + item.movieTitle + " | SL: " + item.ticketCount +
            " | Giá: " + formatMoney(item.pricePerTicket) +
            " | Tổng TT: " + formatMoney(item.totalAmount)
        );
        revenue += item.totalAmount;
    }
    console.log("Tổng: " + list.length + " đơn đặt vé - Doanh thu: " + formatMoney(revenue));
}

function printBill(item, money) {
    console.log("========== HÓA ĐƠN ĐẶT VÉ ==========");
    console.log("Mã đặt vé: " + item.bookingCode);
    console.log("Khách hàng: " + item.customerName);
    console.log("Tên phim: " + item.movieTitle);
    console.log("Số vé: " + item.ticketCount);
    console.log("Giá mỗi vé: " + formatMoney(item.pricePerTicket));
    console.log("Chi phí cơ sở: " + formatMoney(money.baseCost));
    console.log("Giảm giá: " + formatMoney(money.discount));
    console.log("Phí dịch vụ: " + formatMoney(money.serviceFee));
    console.log("Tổng thanh toán: " + formatMoney(money.totalAmount));
}

function addBooking() {
    let code = prompt("Nhập mã đặt vé:");
    if (code === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    code = code.trim().toUpperCase();

    let error = validateBookingCode(code);
    if (error !== "") {
        console.log("Lỗi: " + error);
        return;
    }

    let name = inputName("Nhập tên khách hàng:");
    if (name === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let movie = inputName("Nhập tên phim:");
    if (movie === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let count = inputPositiveInteger("Nhập số vé:");
    if (count === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let price = inputPositiveInteger("Nhập giá mỗi vé:");
    if (price === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let money = calculateTotal(count, price);
    let item = {
        bookingCode: code,
        customerName: name,
        movieTitle: movie,
        ticketCount: count,
        pricePerTicket: price,
        totalAmount: money.totalAmount
    };

    bookings.push(item);
    console.log("Thêm đơn đặt vé thành công!");
    printBill(item, money);
}

function updateBooking() {
    let code = prompt("Nhập mã đặt vé cần cập nhật:");
    if (code === null) {
        console.log("Đã hủy cập nhật");
        return;
    }
    code = code.trim().toUpperCase();

    let index = findBookingIndex(code);
    if (index === -1) {
        console.log("Không tìm thấy đơn đặt vé có mã " + code);
        return;
    }

    let count = inputPositiveInteger("Nhập số vé mới:");
    if (count === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    let price = inputPositiveInteger("Nhập giá mỗi vé mới:");
    if (price === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    let oldTotal = bookings[index].totalAmount;
    let money = calculateTotal(count, price);

    bookings[index].ticketCount = count;
    bookings[index].pricePerTicket = price;
    bookings[index].totalAmount = money.totalAmount;

    console.log("Cập nhật thành công!");
    console.log("Tổng thanh toán cũ: " + formatMoney(oldTotal));
    console.log("Tổng thanh toán mới: " + formatMoney(money.totalAmount));
}

function deleteBooking() {
    let code = prompt("Nhập mã đặt vé cần xóa:");
    if (code === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }
    code = code.trim().toUpperCase();

    let index = findBookingIndex(code);
    if (index === -1) {
        console.log("Không tìm thấy đơn đặt vé có mã " + code);
        return;
    }

    let answer = prompt("Bạn có chắc muốn xóa? (Y/N):");
    if (answer === null || answer.trim().toUpperCase() !== "Y") {
        console.log("Đã hủy thao tác xóa, còn " + bookings.length + " đơn");
        return;
    }

    bookings.splice(index, 1);
    console.log("Xóa thành công, còn " + bookings.length + " đơn");
}

function searchBooking() {
    let word = prompt("Nhập từ khóa tên phim:");
    if (word === null || word.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }
    word = word.trim().toLowerCase();

    let list = [];
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].movieTitle.toLowerCase().includes(word)) {
            list.push(bookings[i]);
        }
    }

    if (list.length === 0) {
        console.log("Không tìm thấy đơn đặt vé phù hợp");
    } else {
        displayBookings(list);
    }
}

function reportBookings() {
    console.log("========== BÁO CÁO TỔNG KẾT ĐƠN ĐẶT VÉ ==========");
    if (bookings.length === 0) {
        console.log("Chưa có đơn đặt vé nào");
        return;
    }

    let revenue = 0;
    let maxItem = bookings[0];

    for (let i = 0; i < bookings.length; i++) {
        revenue += bookings[i].totalAmount;
        if (bookings[i].totalAmount > maxItem.totalAmount) {
            maxItem = bookings[i];
        }
    }

    let average = Math.round(revenue / bookings.length);
    console.log("Tổng số đơn đặt vé: " + bookings.length);
    console.log("Tổng doanh thu: " + formatMoney(revenue));
    console.log("Doanh thu trung bình: " + formatMoney(average));
    console.log("Đơn cao nhất: " + maxItem.bookingCode + " - " + formatMoney(maxItem.totalAmount));
}

function main() {
    while (true) {
        console.log("=====================================================");
        console.log("   HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA");
        console.log("=====================================================");
        console.log("1. Hiển thị danh sách đơn đặt vé");
        console.log("2. Thêm đơn đặt vé mới");
        console.log("3. Cập nhật đơn đặt vé");
        console.log("4. Xóa đơn đặt vé");
        console.log("5. Tìm kiếm đơn đặt vé theo tên phim");
        console.log("0. Thoát chương trình");
        console.log("=====================================================");
        let choice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");

        if (choice === null) {
            console.log("Lựa chọn không hợp lệ!");
            continue;
        }

        choice = choice.trim();
        switch (choice) {
            case "1":
                displayBookings(bookings);
                break;
            case "2":
                addBooking();
                break;
            case "3":
                updateBooking();
                break;
            case "4":
                deleteBooking();
                break;
            case "5":
                searchBooking();
                break;
            case "0":
                reportBookings();
                console.log("Cảm ơn bạn đã sử dụng Moonlight Cinema. Tạm biệt!");
                return;
            default:
                console.log("Lựa chọn không hợp lệ! Vui lòng chọn từ 0 đến 5.");
                break;
        }
    }
}

main();
