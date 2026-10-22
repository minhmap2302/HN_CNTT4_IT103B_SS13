// danh sach ve ban dau
let tickets = [
  {
    pnr: "VN1001",
    passengerName: "Nguyễn Văn An",
    flightNumber: "VN210",
    seatNumber: "12A",
    ticketClass: "ECONOMY",
    status: "BOOKED",
    baggageWeight: 0,
    baggageFee: 0
  },
  {
    pnr: "VN1002",
    passengerName: "Trần Thị Bình",
    flightNumber: "VN210",
    seatNumber: "03C",
    ticketClass: "BUSINESS",
    status: "BOOKED",
    baggageWeight: 0,
    baggageFee: 0
  },
  {
    pnr: "VN1003",
    passengerName: "Lê Minh Châu",
    flightNumber: "VN315",
    seatNumber: "18F",
    ticketClass: "ECONOMY",
    status: "BOOKED",
    baggageWeight: 0,
    baggageFee: 0
  }
];

// tim ve theo ma PNR
function findTicketByPnr(pnr) {
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].pnr === pnr) {
      return tickets[i];
    }
  }
  return null;
}

// kiem tra PNR gom 6 chu cai hoac chu so
function isValidPnr(pnr) {
  if (pnr.length !== 6) {
    return false;
  }

  const validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < pnr.length; i++) {
    if (!validCharacters.includes(pnr[i])) {
      return false;
    }
  }
  return true;
}

// tinh phi hanh ly vuot dinh muc
function calculateExcessBaggageFee(ticketClass, baggageWeight) {
  let freeWeight = 20;
  if (ticketClass === "BUSINESS") {
    freeWeight = 30;
  }

  if (baggageWeight <= freeWeight) {
    return 0;
  }
  return Math.round((baggageWeight - freeWeight) * 50000);
}

// in danh sach ve
function listTickets() {
  if (tickets.length === 0) {
    console.log("Danh sách vé trống");
    return;
  }

  console.log("STT | PNR | Hành khách | Chuyến bay | Ghế | Hạng vé | Trạng thái");
  for (let i = 0; i < tickets.length; i++) {
    const ticket = tickets[i];
    console.log(
      (i + 1) + " | " + ticket.pnr + " | " + ticket.passengerName +
      " | " + ticket.flightNumber + " | " + ticket.seatNumber +
      " | " + ticket.ticketClass + " | " + ticket.status
    );
  }
}

// in the len may bay
function displayBoardingPass(ticket) {
  console.log("------------------------------");
  console.log("THẺ LÊN MÁY BAY");
  console.log("Mã PNR:", ticket.pnr);
  console.log("Hành khách:", ticket.passengerName);
  console.log("Chuyến bay:", ticket.flightNumber);
  console.log("Ghế:", ticket.seatNumber);
  console.log("Hạng vé:", ticket.ticketClass);
  console.log("Hành lý ký gửi:", ticket.baggageWeight, "kg");
  console.log("Phí quá cân:", ticket.baggageFee, "VNĐ");
  console.log("Trạng thái:", ticket.status);
  console.log("------------------------------");
}

// nhap can nang khong am
function inputBaggageWeight() {
  while (true) {
    const input = prompt("Nhập cân nặng hành lý ký gửi (kg):");
    if (input === null) {
      return null;
    }

    const cleanInput = input.trim();
    const weight = Number(cleanInput);
    if (cleanInput !== "" && Number.isFinite(weight) && weight >= 0) {
      return weight;
    }
    console.log("Cân nặng phải là số không âm");
  }
}

// lam thu tuc check-in va thu phi qua can
function checkIn() {
  const inputPnr = prompt("Nhập mã PNR cần check-in:");
  if (inputPnr === null) {
    console.log("Đã hủy thao tác check-in");
    return;
  }

  const pnr = inputPnr.trim().toUpperCase();
  if (!isValidPnr(pnr)) {
    console.log("Mã PNR không hợp lệ");
    return;
  }

  const ticket = findTicketByPnr(pnr);
  if (ticket === null) {
    console.log("Không tìm thấy vé có mã " + pnr);
    return;
  }
  if (ticket.status === "CANCELLED") {
    console.log("Vé đã hủy, không thể check-in");
    return;
  }
  if (ticket.status === "CHECKED_IN") {
    console.log("Vé đã làm thủ tục");
    displayBoardingPass(ticket);
    return;
  }

  const baggageWeight = inputBaggageWeight();
  if (baggageWeight === null) {
    console.log("Đã hủy thao tác check-in");
    return;
  }

  const baggageFee = calculateExcessBaggageFee(ticket.ticketClass, baggageWeight);
  console.log("Phí hành lý quá cân:", baggageFee, "VNĐ");
  ticket.baggageWeight = baggageWeight;
  ticket.baggageFee = baggageFee;
  ticket.status = "CHECKED_IN";
  console.log("Check-in thành công");
  displayBoardingPass(ticket);
}

// tra cuu ve theo ma PNR hoac ten hanh khach
function searchTicket() {
  const input = prompt("Nhập mã PNR hoặc tên hành khách:");
  if (input === null || input.trim() === "") {
    console.log("Chưa nhập thông tin tìm kiếm");
    return;
  }

  const keyword = input.trim().toLowerCase();
  let found = false;
  for (let i = 0; i < tickets.length; i++) {
    const ticket = tickets[i];
    if (ticket.pnr.toLowerCase() === keyword || ticket.passengerName.toLowerCase().includes(keyword)) {
      console.log("Mã PNR:", ticket.pnr);
      console.log("Hành khách:", ticket.passengerName);
      console.log("Chuyến bay:", ticket.flightNumber);
      console.log("Ghế:", ticket.seatNumber);
      console.log("Hạng vé:", ticket.ticketClass);
      console.log("Trạng thái:", ticket.status);
      console.log("--------------------");
      found = true;
    }
  }
  if (found === false) {
    console.log("Không tìm thấy vé phù hợp");
  }
}

// huy ve theo ma PNR
function cancelTicket() {
  const inputPnr = prompt("Nhập mã PNR cần hủy:");
  if (inputPnr === null) {
    console.log("Đã hủy thao tác");
    return;
  }

  const pnr = inputPnr.trim().toUpperCase();
  if (!isValidPnr(pnr)) {
    console.log("Mã PNR không hợp lệ");
    return;
  }

  const ticket = findTicketByPnr(pnr);
  if (ticket === null) {
    console.log("Không tìm thấy vé có mã " + pnr);
    return;
  }
  if (ticket.status === "CANCELLED") {
    console.log("Vé này đã được hủy trước đó");
    return;
  }

  const answer = prompt("Xác nhận hủy vé (Y/N):");
  if (answer === null || answer.trim().toUpperCase() !== "Y") {
    console.log("Đã hủy thao tác");
    return;
  }

  ticket.status = "CANCELLED";
  console.log("Đã hủy vé " + ticket.pnr);
}

// dieu phoi menu chinh
function main() {
  let menuChoice = "";
  do {
    console.log("------------------------------");
    console.log("QUẦY CHECK-IN VÉ MÁY BAY");
    console.log("1. Hiển thị danh sách vé");
    console.log("2. Check-in và cân hành lý");
    console.log("3. Tra cứu vé");
    console.log("4. Hủy vé");
    console.log("5. Thoát chương trình");
    console.log("------------------------------");

    const input = prompt("Nhập lựa chọn từ 1 đến 5:");
    if (input === null) {
      menuChoice = "";
    } else {
      menuChoice = input.trim();
    }

    switch (menuChoice) {
      case "1":
        listTickets();
        break;
      case "2":
        checkIn();
        break;
      case "3":
        searchTicket();
        break;
      case "4":
        cancelTicket();
        break;
      case "5":
        console.log("Đã kết thúc ca làm việc");
        break;
      default:
        console.log("Lựa chọn không hợp lệ");
    }
  } while (menuChoice !== "5");
}

main();
