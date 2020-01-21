<template>
    <div>
        <div class="navbar">
            <div class="dropdown">
                <div class="menu-header">
                    <button v-on:click="onMenu" class="dropbtn">{{selectedBook}}</button>
                    <div class="connection-container">
                        <select class="quarters" v-on:change="quarterChange()" v-model="quarter">
                            <option value="Q1">Quarter1</option>
                            <option value="Q2">Quarter2</option>
                            <option value="Q3">Quarter3</option>
                            <option value="Q4">Quarter4</option>
                        </select>
                        <div style="display:inline-block;">
                            <button class="connection-status">{{connectionIndicator}}</button>
                        </div>
                    </div>
                </div>
                <div id="content-div" class="dropdown-content">
                    <a
                            v-on:click="pageChange(item)"
                            v-for="item in currentBook.data"
                            v-bind:key="item.order"
                    >{{item.displayName}}</a>
                </div>
            </div>
        </div>

        <div v-if="!loadingIndicator" id="contents-container" style="position:relative;top:30px; ">
            <img v-for="item in pageCount" v-bind:src="getImangeUrl(item)" v-bind:key="item.order"/>
        </div>
        <div id="appLoadingIndicator" v-show="loadingIndicator">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Menu",
        props: {
            type: String
        },
        methods: {
            onContent: function () {
                if (document.getElementById("content-div"))
                    document.getElementById("content-div").style.display = "none";
            },

            onMenu: function () {
                if (document.getElementById("content-div"))
                    document.getElementById("content-div").style.display = "block";
            },

            getImangeUrl: function (indexNumber) {
                return (
                    "./content/" +
                    this.currentBook.name +
                    "/html5/" +
                    this.currentBook.bookname +
                    "/" +
                    this.quarter +
                    "/r_Page_" +
                    this.getPageNumber(this.pageCount, indexNumber) +
                    ".png"
                );
            },
            getImangeUrlForBook: function (
                totalPages,
                indexNumber,
                name,
                bookname,
                quarter
            ) {
                // eslint-disable-next-line no-console
                console.info(
                    "./content/" +
                    name +
                    "/html5/" +
                    bookname +
                    "/" +
                    quarter +
                    "/r_Page_" +
                    this.getPageNumber(totalPages, indexNumber) +
                    ".png"
                );
                return (
                    "./content/" +
                    name +
                    "/html5/" +
                    bookname +
                    "/" +
                    quarter +
                    "/r_Page_" +
                    this.getPageNumber(totalPages, indexNumber) +
                    ".png"
                );
            },

            getPageNumber: function (totalPages, indexNumber) {
                var pageNumber = "" + indexNumber;
                if (totalPages > 99) {
                    return pageNumber.padStart(3, "0");
                } else if (totalPages > 9) {
                    return pageNumber.padStart(2, "0");
                }
                return pageNumber;
            },

            getQuarter: function () {
                var quarter = "Q1";
                quarter = "Q" + (parseInt(new Date().getMonth() / 3) + 1);
                return quarter;
            },

            quarterChange: async function () {
                this.pageCount = this.selectedFolder.pageCount[this.quarter];
                var impageContainerDiv = document.getElementById("contents-container");
                var loadingIndicatorDiv = document.getElementById("appLoadingIndicator");
                loadingIndicatorDiv.style.display = "block";
                impageContainerDiv.style.display = "none";
                this.loadingIndicator = true;
                // Remove existing images
                var child = impageContainerDiv.lastElementChild;
                while (child) {
                    impageContainerDiv.removeChild(child);
                    child = impageContainerDiv.lastElementChild;
                }

                // add new imaages
                for (var j = 0; j < this.pageCount; j++) {
                    var imag = document.createElement("img");
                    imag.src = this.getImangeUrl(j + 1);
                    impageContainerDiv.appendChild(imag);
                }
                this.loadingIndicator = false;
                loadingIndicatorDiv.style.display = "none";
                impageContainerDiv.style.display = "block";
            },

            pageChange: async function (item) {
                if (document.getElementById("content-div"))
                    document.getElementById("content-div").style.display = "none";

                var impageContainerDiv = document.getElementById("contents-container");
                var loadingIndicatorDiv = document.getElementById("appLoadingIndicator");
                loadingIndicatorDiv.style.display = "block";
                impageContainerDiv.style.display = "none";
                this.currentBook.bookname = item.name;
                this.loadingIndicator = true;
                this.selectedBook = item.displayName;
                // Remove existing images
                var child = impageContainerDiv.lastElementChild;
                while (child) {
                    impageContainerDiv.removeChild(child);
                    child = impageContainerDiv.lastElementChild;
                }
                this.pageCount = item.pageCount[this.quarter];
                // add new imaages
                for (var j = 0; j < this.pageCount; j++) {
                    var imag = document.createElement("img");
                    imag.src = this.getImangeUrl(j + 1);
                    impageContainerDiv.appendChild(imag);
                }
                this.loadingIndicator = false;
                loadingIndicatorDiv.style.display = "none";
                impageContainerDiv.style.display = "block";
            }
        },

        async mounted() {
            this.loadingIndicator = true;
            this.quarter = this.getQuarter();
            if (window.document.location.search === "?book=acg") {
                this.currentBook = this.acg;
            } else if (window.document.location.search === "?book=lcg") {
                this.currentBook = this.lcg;
            } else if (window.document.location.search === "?book=ggro") {
                this.currentBook = this.ggro;
            } else if (window.document.location.search === "?book=slsef") {
                this.currentBook = this.slsef;
            }
            this.selectedFolder = this.currentBook.data[0];
            this.pageCount = this.currentBook.data[0].pageCount[this.quarter];
            this.currentBook.bookname = this.currentBook.data[0].name;
            this.selectedBook = this.currentBook.data[0].displayName;
            let responseSet = false;
            var totalPages = 1 * this.currentBook.data.length;
            if (navigator.onLine) {
                let cachedResponse = null;
                for (var i = 0; i < this.currentBook.data.length; i++) {
                    for (
                        var j = 0;
                        j < this.currentBook.data[i].pageCount[this.quarter];
                        j++
                    ) {
                        this.lastUrl = this.getImangeUrlForBook(
                            this.currentBook.data[i].pageCount[this.quarter],
                            j + 1,
                            this.currentBook.name,
                            this.currentBook.data[i].name,
                            this.quarter
                        );
                        const promiseFirst = await fetch(this.lastUrl, {METHOD: "GET"});
                        if (!responseSet) {
                            await promiseFirst.text();
                        }
                    }
                    if (!cachedResponse) {
                        if (navigator.onLine && i < this.currentBook.data.length - 1)
                            this.connectionIndicator =
                                Math.round((100 * (i + 1)) / totalPages) + "% offline ready";
                        else this.connectionIndicator = "Offline ready";
                    }
                }
                if (!responseSet) {
                    responseSet = true;
                    this.loadingIndicator = false;
                }
            } else {
                this.loadingIndicator = false;
                this.connectionIndicator = "Offline";
            }
        },

        data() {
            return {
                loadingIndicator: true,
                connectionIndicator: "Online",
                initialScaleValue: 1,
                currentBook: {},
                pageCount: 0,
                quarter: "Q1",
                selectedFolder: null,
                lastUrl: null,
                selectedBook: "Book",
                acg: {
                    name: "ACG",
                    data: [
                        {
                            name: "SectorData",
                            displayName: "Sector Data",
                            order: 1,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "AttributionData",
                            displayName: "Attribution Data",
                            order: 2,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "ContributionData",
                            displayName: "Contribution Data",
                            order: 3,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "RiskData",
                            displayName: "Risk Data",
                            order: 4,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "Characteristics",
                            displayName: "Characteristics",
                            order: 5,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "Trades",
                            displayName: "Trades",
                            order: 6,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "DetailedTransactions",
                            displayName: "Detailed Transactions",
                            order: 7,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "Holdings",
                            displayName: "Holdings",
                            order: 8,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "ADRWeights",
                            displayName: "ADR Weights",
                            order: 9,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "MarketingBookData",
                            displayName: "Marketing Book Data",
                            order: 10,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "QuarterlyCommentary",
                            displayName: "Quarterly Commentary",
                            order: 11,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        },
                        {
                            name: "StockStories",
                            displayName: "Stock Stories",
                            order: 12,
                            pageCount: {Q1: 40, Q2: 40, Q3: 40, Q4: 40}
                        }
                    ]
                },
                lcg: {
                    name: "LCG",
                    data: [
                        {
                            name: "SectorData",
                            displayName: "Sector Data",
                            order: 1,
                            pageCount: 70
                        },
                        {
                            name: "AttributionData",
                            displayName: "Attribution Data",
                            order: 2,
                            pageCount: 84
                        },
                        {
                            name: "ContributionData",
                            displayName: "Contribution Data",
                            order: 3,
                            pageCount: 105
                        },
                        {
                            name: "RiskData",
                            displayName: "Risk Data",
                            order: 4,
                            pageCount: 21
                        },
                        {
                            name: "Characteristics",
                            displayName: "Characteristics",
                            order: 5,
                            pageCount: 15
                        },
                        {
                            name: "Trades",
                            displayName: "Trades",
                            order: 6,
                            pageCount: 13
                        },
                        {
                            name: "DetailedTransactions",
                            displayName: "Detailed Transactions",
                            order: 7,
                            pageCount: 27
                        },
                        {
                            name: "Amazon",
                            displayName: "Amazon",
                            order: 8,
                            pageCount: 8
                        },
                        {
                            name: "HOLTAnalysis",
                            displayName: "HOLT Analysis",
                            order: 9,
                            pageCount: 5
                        },
                        {
                            name: "Holdings",
                            displayName: "Holdings",
                            order: 10,
                            pageCount: 55
                        },
                        {
                            name: "ADRWeights",
                            displayName: "ADR Weights",
                            order: 11,
                            pageCount: 112
                        },
                        {
                            name: "MarketingBookData",
                            displayName: "Marketing Book Data",
                            order: 12,
                            pageCount: 59
                        },
                        {
                            name: "QuarterlyCommentary",
                            displayName: "Quarterly Commentary",
                            order: 13,
                            pageCount: 73
                        },
                        {
                            name: "AlphaThesisPaper",
                            displayName: "Alpha Thesis Paper",
                            order: 14,
                            pageCount: 12
                        },
                        {
                            name: "StockStories",
                            displayName: "Stock Stories",
                            order: 15,
                            pageCount: 30
                        }
                    ]
                },
                ggro: {
                    name: "GGRO",
                    data: [
                        {
                            name: "SectorData",
                            displayName: "Sector Data",
                            order: 1,
                            pageCount: 12
                        },
                        {
                            name: "RegionData",
                            displayName: "Region Data",
                            order: 2,
                            pageCount: 12
                        },
                        {
                            name: "CountryData",
                            displayName: "Country Data",
                            order: 3,
                            pageCount: 16
                        },
                        {
                            name: "AttributionSector",
                            displayName: "Attribution - Sector",
                            order: 4,
                            pageCount: 29
                        },
                        {
                            name: "AttributionRegion",
                            displayName: "Attribution - Region",
                            order: 5,
                            pageCount: 24
                        },
                        {
                            name: "AttributionCountry",
                            displayName: "Attribution – Country",
                            order: 6,
                            pageCount: 24
                        },
                        {
                            name: "ContributionData",
                            displayName: "Contribution Data",
                            order: 7,
                            pageCount: 29
                        },
                        {
                            name: "RiskData",
                            displayName: "Risk Data",
                            order: 8,
                            pageCount: 21
                        },
                        {
                            name: "Characteristics",
                            displayName: "Characteristics",
                            order: 9,
                            pageCount: 5
                        },
                        {
                            name: "Trades",
                            displayName: "Trades",
                            order: 10,
                            pageCount: 4
                        },
                        {
                            name: "Holdings",
                            displayName: "Holdings",
                            order: 11,
                            pageCount: 15
                        },
                        {
                            name: "MarketingBookData",
                            displayName: "Marketing Book Data",
                            order: 12,
                            pageCount: 12
                        },
                        {
                            name: "QuarterlyCommentary",
                            displayName: "Quarterly Commentary",
                            order: 13,
                            pageCount: 76
                        },
                        {
                            name: "AlphaThesisPaper",
                            displayName: "Alpha Thesis Paper",
                            order: 14,
                            pageCount: 12
                        }
                    ]
                },
                slsef: {
                    name: "SLSEF",
                    data: [
                        {
                            name: "SectorData",
                            displayName: "Sector Data",
                            order: 1,
                            pageCount: 32
                        },
                        {
                            name: "AttributionData",
                            displayName: "Attribution - Sector",
                            order: 2,
                            pageCount: 45
                        },
                        {
                            name: "ContributionData",
                            displayName: "Contribution Data",
                            order: 3,
                            pageCount: 49
                        },
                        {
                            name: "Characteristics",
                            displayName: "Characteristics",
                            order: 4,
                            pageCount: 9
                        },
                        {
                            name: "Trades",
                            displayName: "Trades",
                            order: 5,
                            pageCount: 20
                        },
                        {
                            name: "Holdings",
                            displayName: "Holdings",
                            order: 6,
                            pageCount: 31
                        },
                        {
                            name: "FundStatistics",
                            displayName: "Fund Statistics",
                            order: 7,
                            pageCount: 7
                        },
                        {
                            name: "MarketingBook",
                            displayName: "Marketing Book",
                            order: 8,
                            pageCount: 64
                        },
                        {
                            name: "InvestorLetter",
                            displayName: "Investor Letter",
                            order: 9,
                            pageCount: 44
                        }
                    ]
                }
            };
        }

    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    body {
        font-family: Arial, Helvetica, sans-serif;
    }

    .dropbtn {
        color: black;
        padding: 16px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        background-color: #f9f9f9;
        width: 40%;
        text-align: left;
    }

    .dropdown {
        position: fixed;
        display: inline-block;
        background-color: #f9f9f9;
        width: 100%;
        text-align: left;
        margin-left: -8px;
        margin-top: 0px;
        z-index: 9999;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        width: 240px;
        min-width: 240px;
        text-align: left;
    }

    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {
        background-color: #f1f1f1;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .pagecontents {
        margin-top: 50px;
    }

    .navbar {
        width: 100%;
        float: left;
        position: absolute;
        top: 0px;
        z-index: 9999;
        text-align: left;
    }

    .connection-container {
        text-align: right;
        float: right;
        width: 50%;
    }

    #contents-container img {
        width: 95%;
        border-bottom: 2px solid lightgray;
    }

    .quarter-option {
        font-size: 16px;
        display: inline-block;
    }

    .quarters {
        height: 30px;
        font-size: 16px;
    }

    .page {
        width: 95%;
    }

    .connection-status {
        color: black;
        padding: 16px;
        padding-left: 3px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        background-color: #f9f9f9;
        width: 150px;
        text-align: right;
    }

    @media only screen and (max-width: 761px) {
        .connection-status {
            font-size: 41px;
        }

        .quarter-option {
            font: 43px;
        }

        .quarters {
            font-size: 26px;
        }

        .dropbtn {
            font-size: 41px;
        }

        .dropdown-content a {
            font-size: 41px;
        }

        .pagecontents {
            width: 100%;
        }

        #contents-container img {
            width: 250%;
        }

        .dropdown-content {
            width: 420px;
            min-width: 420px;
        }
    }

    @media only screen and (min-width: 762px) and (max-width: 1024px) {
        .connection-status {
            font-size: 20px;
            width: 180px;
        }

        .quarter-option {
            font-size: 43px;
        }

        .quarters {
            font-size: 26px;
        }

        #contents-container img {
            width: 150%;
        }

        .dropbtn {
            font-size: 20px;
        }

        .dropdown-content a {
            font-size: 20px;
        }

        .dropdown-content {
            width: 420px;
            min-width: 420px;
        }

        .pagecontents {
            width: 100%;
            max-width: 670px;
        }
    }

    .connection-status:hover .dropdown-content {
        display: none;
    }

    .menu-header {
        z-index: 9999;
        border-bottom: 1px solid darkgray;
    }

    #appLoadingIndicator {
        position: absolute;
        top: 50px;
        padding-top: 20%;
        text-align: center;
        vertical-align: middle;
        width: 100%;
        height: 100%;
        -webkit-animation-name: appLoadingIndicator;
        -webkit-animation-duration: 0.8s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-direction: reverse;
        background-color: #fbffff;
    }

    #appLoadingIndicator > * {
        background-color: #67636b;
        display: inline-block;
        height: 30px;
        -webkit-border-radius: 15px;
        margin: 0 5px;
        width: 30px;
        opacity: 0.8;
    }

    @-webkit-keyframes appLoadingIndicator {
        0% {
            opacity: 0.8;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 0.8;
        }
    }
</style>

