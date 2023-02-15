const renderListItem = ({ marker, seriesName, value }) =>
  ` <div id="name">${marker} ${seriesName}</div> 
    <div id="value">${value} шт.</div>
  `;

const changeTooltip = (params) => {
  const inProgramm = [];
  const outProgramm = [];
  let firstAmount = 0;
  let secondAmount = 0;

  params.forEach(({ marker, seriesName, value }) => {
    if (seriesName.includes("В программе")) {
      inProgramm.push({ marker, seriesName, value });
      firstAmount += value;
    } else {
      outProgramm.push({ marker, seriesName, value });
      secondAmount += value;
    }
  });

  sum = firstAmount + secondAmount;
  percent = Math.round((firstAmount / sum) * 100);

  return `
    <div id="tooltip">
        <div id="month">
          ${params[0].axisValueLabel} 
        </div>

        <div>
          <div id="title">В программе</div>
          <div id="value">${percent}% | ${firstAmount} шт.</div>
        </div>
        ${inProgramm.map(renderListItem).join("<br>")}
        <br>

        <div>
          <div id="title">Вне программы</div>
          <div id="value">${100 - percent}% | ${secondAmount} шт.</div>
        </div>
  
        ${outProgramm.map(renderListItem).join("<br>")}
    </div>`;
};
