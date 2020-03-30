window.onload = function(){

    /*Nizovi*/
    var nizLevi = [];
    var nizDesni = [];
    var nizZaPoredjenje = [];
    var noviNizDesno = [];

    var marker = false;
    /*Checkbox*/
    var chbLevi = [];
    var chbDesni = [];
    var chbCheck = [];

    InicijalniIspisULevomBloku();

    document.getElementById("levoDugme").addEventListener("click", DohvatanjeObjekataZaDesniBlok);
    document.getElementById("desnoDugme").addEventListener("click", DohvatanjeObjekataZaLeviBlok);

    document.getElementById("dugmePosalji").addEventListener("click", function(){
        $.ajax({
            url: "proba.php",
            method : "GET",
            data: {
                nizProizvoda : nizLevi
            },
            success: function(data){
                alert(data);
            },
            error: function(error){
                console.log(error);
            }
        })
    })

    function DohvatanjeObjekataZaLeviBlok(){

        let chb = document.getElementsByClassName("artikliDesno");

        for(let c of chb){
            if(c.checked){
                chbDesni.push(c.getAttribute("data-id"));
            }
        }

        if(chbDesni.length == 0){
            alert("Niste cekirali ni jedan proizvod");
        }
        else{
            $.ajax({
                url:"storage/artikli.json",
                method:"GET",
                success: function(data){
                    for(let d of data){
                        if(chbDesni.includes(String(d.id))){
                            nizLevi.push(d);
                        }
                        
                    }
                    marker = true;
                    InicijalniIspisULevomBloku();
                    
                },
                error: function(error){
                    console.error(error);
                }
            })
        }
    }

    function SacuvasProizvodeNaDesnojStrani(){           
        for(let d of nizDesni){
            if(!chbDesni.includes(String(d.id))){
                noviNizDesno.push(d);
            }
        }
         
        nizDesni = noviNizDesno;
        IspisHtmlDesniBlok(nizDesni);
        noviNizDesno = [];
    }

    function DohvatanjeObjekataZaDesniBlok(){
        let chb = document.getElementsByClassName("artikliLevo");

        for(let c of chb){
            if(c.checked){
                chbLevi.push(c.getAttribute("data-id"));
                
            }
        }

        if(chbLevi.length == 0) {
            alert("Niste cekirali ni jedan proizvod");
        }
        else{
            $.ajax({
                url:"storage/artikli.json",
                method:"GET",
                success: function(data){
                    if(nizDesni.length > 0){
                        for(let d of data){
                            if(chbLevi.includes(String(d.id))){
                                noviNizDesno.push(d);
                            }
                        }
                        InicijalniIspisULevomBloku();
                        SacuvasProizvodeNaDesnojStrani();
                        IspisHtmlDesniBlok(noviNizDesno);
                    }
                    else{
                        for(let d of data){
                            if(chbLevi.includes(String(d.id))){
                                nizDesni.push(d);
                            }
                            
                        }
                        InicijalniIspisULevomBloku();
                        if(marker){
                            SacuvasProizvodeNaDesnojStrani();
                            marker = false;
                        }
                        else{
                            IspisHtmlDesniBlok(nizDesni);
                        }
                    }
                    
                   
                },
                error: function(error){
                    console.error(error);
                }
            })
        }
    }
    

    function InicijalniIspisULevomBloku(){
        
        for(let c of chbLevi){
            chbCheck.push(c);
        }

        $.ajax({
            url:"storage/artikli.json",
            method:"GET",
            success: function(data){
                for(let d of data){
                    if(!chbCheck.includes(String(d.id))){
                        nizLevi.push(d);
                    }
                }
                IspisHtmlLeviBlok(nizLevi);
                chbLevi = [];
                nizLevi = [];
                if(marker){
                    SacuvasProizvodeNaDesnojStrani();
                    marker = false;
                }
                else{
                    IspisHtmlDesniBlok(nizDesni);
                }
            },
            error: function(error){
                console.error(error);
            }
        })
    }

    function IspisHtmlLeviBlok(data){
        let html = "";
        for(let d of data){
            html += `
            <input type="checkbox" name="${d.Naziv}" class="artikliLevo" data-id="${d.id}"> <span>${d.Naziv}</span> <br>
            `;
        }
        document.getElementById("leviBlock").innerHTML = html;
    }

    function IspisHtmlDesniBlok(data){
        let html = "";
        for(let d of data){
            html += `
            <input type="checkbox" name="${d.Naziv}" class="artikliDesno" data-id="${d.id}"> <span>${d.Naziv}</span> <br>
            `;
        }
        document.getElementById("desniBlock").innerHTML = html;
    }
    
}

