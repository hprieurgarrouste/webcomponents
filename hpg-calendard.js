/**
 * 
 */
class HpgCalendar extends HTMLElement {
	constructor() {
		super();
		this.conf = {
			"firstDayOfWeek" : 1,
			"shortDays":["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],
			"months" : ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
		};
		this.curDte = new Date(2019, 0, 1);
		let shadowRoot = this.attachShadow({mode: 'open'});
	    let tbl = document.createElement('table');
	    tbl.createCaption().textContent = this.conf.months[this.curDte.getMonth()] + ' ' + this.curDte.getFullYear();
	    let row = tbl.createTHead().insertRow();
	    row.insertCell();
	    for(var t=0; t<7; t++) {
	    	row.insertCell(t+1).textContent = this.conf.shortDays[(t + this.conf.firstDayOfWeek) % 7] ;
	    }
	    
		let firstDte = new Date(this.curDte.getFullYear(), this.curDte.getMonth(), 1);
		let firstDay = (firstDte.getDay() - this.conf.firstDayOfWeek + 7) % 7;
		let nbDays = new Date(firstDte.getFullYear(), firstDte.getMonth()+1, 0).getDate();
		let iDay = 1;
		let tbody = tbl.createTBody();
		for (var t=0; t<37; t++) {
			if ((t % 7) == 0) {
				row = tbody.insertRow();
				row.insertCell();
			}
			row.insertCell().textContent = (t>=firstDay && iDay<nbDays) ? iDay++ : "";
		}
		shadowRoot.appendChild(tbl);
	}
}
customElements.define('hpg-calendar', HpgCalendar);
