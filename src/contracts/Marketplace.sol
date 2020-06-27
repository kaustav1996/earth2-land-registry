pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    address payable public company_address;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        string email;
        string latitude;
        string longitude;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        string email,
        string latitude,
        string longitude,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        string email,
        string latitude,
        string longitude,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Earth 2.0 Land Blockchain Registry";
        company_address = msg.sender;
    }

    function createProduct  (string memory _name,string memory _email,string memory _latitude,string memory _longitude, uint _price) public payable {
        // Require a valid latitude , longitude
        require(bytes(_latitude).length > 0);
        require(bytes(_longitude).length > 0);
        require(bytes(_name).length > 0);
        require(bytes(_email).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount ++;
        // Create the product
        products[productCount] = Product(productCount, 'Earth 2.0 Land Blockchain Registry', ':)',_latitude,_longitude, _price,  company_address, false);
        // Trigger an event
        emit ProductCreated(productCount,'Earth 2.0 Land Blockchain Registry', ':)',_latitude,_longitude, _price,company_address, false);
        Product memory _product = products[productCount];
        address payable _seller = company_address;
        require(msg.value >= _product.price);
        _product.name= _name;
        _product.email = _email;
        _product.owner = msg.sender;
        _product.purchased = true;
        products[productCount] = _product;
        address(_seller).transfer(msg.value);
        emit ProductPurchased(productCount,_name,_email, _product.latitude,_product.longitude,_product.price, msg.sender, true);

    }
}
