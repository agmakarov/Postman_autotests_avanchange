////////////////////////////////////////////////////////////////////
/// Endpoint: https://api.avanchange.com/v1/exchange/currencies ///
/// Проверка что в списке валют есть все 83 наименования       ///
/////////////////////////////////////////////////////////////////

var body = pm.response.text();
totalNames = body.split(":").length - 1;

pm.test("Check if Total names is 83", function () {
    pm.expect(totalNames).to.eql(83);
});

///////////////////////////////////////////////////////////////////////
/// Endpoint: https://api.avanchange.com/v1/exchange/rates?start=1 ///
/// Проверка отстука работы курса (200) и работы всех 50 пар      ///
////////////////////////////////////////////////////////////////////

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Total woking pairs is 50", function () {
    pm.expect(pm.response.text()).to.include("50");
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Endpoint: https://api.avanchange.com/v1/order/check/?hash=d88b1e8f0e32b9a8bfe1e698b074dab62397b8f9 ///
/// Проверка недоступности проверки заявки на обмен без Апи Токена (авторизации)                      ///
////////////////////////////////////////////////////////////////////////////////////////////////////////

pm.test("API Token not set, can`t acces without it", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.code).to.eql(3001);
});