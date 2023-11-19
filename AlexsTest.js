describe("FundMe", async function () {
    let fundMe, deployer, mockV3Aggregator;

    beforeEach(async function () {
        // deploy our fundMe contract
        // using Hardhat-deploy
        // const accounts = await ethers.getSigners(); // returns the accounts of this specific network -> if hardhat -> 10 fake acocunts

        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        fundMe = await ethers.getContract("FundMe", deployer); //hardhat deploy wraps ethers with a function getContract
        // -> get recenet deployment of whatever contract we tell it
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer,
        );
    });

    describe("constructor", async function () {
        it("sets the aggregator addresses correctly", async function () {
            const response = fundMe.priceFeed;
            assert.equal(response, mockV3Aggregator.address);
        });
    });

    describe("fund", async function () {
        it("Fails if you don't send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!",
            );
        });
    });
});
