<template>
    <div>
        <div class="navbar">
            <div class="dropdown">
                <div class="menu-header">
                    <button v-on:click="onMenu" class="dropbtn">{{selectedBook}}</button>
                    <div class="connection-container">
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
            <img
                    v-for="item in pageCount"
                    v-bind:src="getImangeUrl(item)"
                    v-bind:key="item.order"
            />
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
                    "/r_Page_" +
                    this.getPageNumber(this.pageCount, indexNumber) +
                    ".png"
                );
            },
            getImangeUrlForBook: function (totalPages, indexNumber, name, bookname) {
                return (
                    "./content/" +
                    name +
                    "/html5/" +
                    bookname +
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
                this.pageCount = item.pageCount;
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
            if (window.document.location.search === "?book=book1") {
                this.currentBook = this.book1;
            } else if (window.document.location.search === "?book=book2") {
                this.currentBook = this.book2;
            this.pageCount = this.currentBook.data[0].pageCount;
            this.currentBook.bookname = this.currentBook.data[0].name;
            this.selectedBook = this.currentBook.data[0].displayName;
            let responseSet = false;
            for (var i = 0; i < this.currentBook.data.length; i++) {
                for (var j = 0; j < this.currentBook.data[i].pageCount; j++) {
                    let cachedResponse = null;
                    this.lastUrl = this.getImangeUrlForBook(
                        this.currentBook.data[i].pageCount,
                        j + 1,
                        this.currentBook.name,
                        this.currentBook.data[i].name
                    );
                    const promiseFirst = await fetch(this.lastUrl, {METHOD: "GET"});
                    if (!responseSet) {
                        await promiseFirst.text();
                    }

                    if (!cachedResponse) {
                        if (navigator.onLine && i < this.currentBook.data.length - 1)
                            this.connectionIndicator =
                                Math.round(100 * ((i + 1) / this.currentBook.data.length)) +
                                "% offline ready";
                        else this.connectionIndicator = "Offline ready";
                    }
                }

                if (!responseSet) {
                    responseSet = true;
                    this.loadingIndicator = false;
                }
            }
        },

        data() {
            return {
                loadingIndicator: true,
                connectionIndicator: "Online",
                initialScaleValue: 1,
                currentBook: {},
                pageCount: 0,
                selectedFolder: null,
                lastUrl: null,
                selectedBook: "Book",
                book1: {
                    name: "book1",
                    data: [
                        {
                            name: "Page 1",
                            displayName: "page1",
                            order: 1,
                            pageCount: 70
                        }
                    ]
                },
                book1: {
                    name: "book2",
                    data: [
                        {
                            name: "Page2",
                            displayName: "Page 2",
                            order: 1,
                            pageCount: 70
                        }
                    ]
                }
            };
        }
    };
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

