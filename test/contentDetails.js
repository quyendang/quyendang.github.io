console.clear()

let id = location.search.split('?')[1]
console.log(id)

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

    let imgTag = document.createElement('img')
     imgTag.id = 'imgDetails'
     //imgTag.id = ob.photos
     imgTag.src = ob.preview

    imageSectionDiv.appendChild(imgTag)

    let productDetailsDiv = document.createElement('div')
    productDetailsDiv.id = 'productDetails'

    // console.log(productDetailsDiv);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)
    console.log(h4);

    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'

    let h3DetailsDiv = document.createElement('h3')
    let h3DetailsText = document.createTextNode(ob.price + " VND")
    h3DetailsDiv.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Description')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)

    let productPreviewDiv = document.createElement('div')
    productPreviewDiv.id = 'productPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Product Preview')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    productPreviewDiv.appendChild(h3ProductPreviewDiv)

    let i;
    for(i=0; i<ob.photos.length; i++)
    {
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.id = 'previewImg'
        imgTagProductPreviewDiv.src = ob.photos[i]
        imgTagProductPreviewDiv.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = ob.photos[i]
            document.getElementById("imgDetails").src = this.src 
            
        }
        productPreviewDiv.appendChild(imgTagProductPreviewDiv)
    }

    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'

    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)

    buttonText = document.createTextNode('Add to Cart')
    buttonTag.onclick  =   function()
    {
        let order = id+" "
        let counter = 1
        if(document.cookie.indexOf(',counter=')>=0)
        {
            order = id + " " + document.cookie.split(',')[0].split('=')[1]
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1
        }
        document.cookie = "orderId=" + order + ",counter=" + counter
        document.getElementById("badge").innerHTML = counter
        console.log(document.cookie)
    }
    buttonTag.appendChild(buttonText)


    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(productDetailsDiv)
    productDetailsDiv.appendChild(h1)
    productDetailsDiv.appendChild(h4)
    productDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(para)
    productDetailsDiv.appendChild(productPreviewDiv)
    
    
    productDetailsDiv.appendChild(buttonDiv)

    var deviceListHTML = "";

    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Kích thước</td>";
    deviceListHTML += "<td>" + ob.info.size + "</td>";
    deviceListHTML += "</tr>";
    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Dung tích cốp</td>";
    deviceListHTML += "<td>" + ob.info.dungtichcop + "</td>";
    deviceListHTML += "</tr>";
    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Khối lượng</td>";
    deviceListHTML += "<td>" + ob.info.khoiluong + "</td>";
    deviceListHTML += "</tr>";
    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Pin</td>";
    deviceListHTML += "<td>" + ob.info.pin + "</td>";
    deviceListHTML += "</tr>";
    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Quãng đường đi được</td>";
    deviceListHTML += "<td>" + ob.info.quangduong + "</td>";
    deviceListHTML += "</tr>";
    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Thời gian sạc</td>";
    deviceListHTML += "<td>" + ob.info.thoigiansac + "</td>";
    deviceListHTML += "</tr>";
    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Công suất định danh</td>";
    deviceListHTML += "<td>" + ob.info.congsuatdinhdanh + "</td>";
    deviceListHTML += "</tr>";
    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Công suất tối đa</td>";
    deviceListHTML += "<td>" + ob.info.congsuattoida + "</td>";
    deviceListHTML += "</tr>";
    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Tốc độ tối đa</td>";
    deviceListHTML += "<td>" + ob.info.tocdo + "</td>";
    deviceListHTML += "</tr>";
    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Loại phanh</td>";
    deviceListHTML += "<td>" + ob.info.loaiphanh + "</td>";
    deviceListHTML += "</tr>";
    deviceListHTML += "<tr>";
    deviceListHTML += "<td>Lốp xe</td>";
    deviceListHTML += "<td>" + ob.info.lopxe + "</td>";
    deviceListHTML += "</tr>";

    document.getElementById("thongsoList").innerHTML = deviceListHTML;

    return mainContainer
}



// BACKEND CALLING

let httpRequest = new XMLHttpRequest()
{
    httpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status == 200)
        {
            console.log('connected!!');
            let contentDetails = JSON.parse(this.responseText)
            {
                console.log(contentDetails);
                dynamicContentDetails(contentDetails)
            }
        }
        else
        {
            console.log('not connected!');
        }
    }
}

httpRequest.open('GET', 'https://666079ab5425580055b4139f.mockapi.io/api/v1/products/'+id, true)
httpRequest.send()  
