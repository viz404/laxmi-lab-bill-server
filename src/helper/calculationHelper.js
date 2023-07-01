function updateWork(works, workPriceMap) {
  let total = 0;

  for (let work of works) {
    let units = 0;

    if (work.upper_left) {
      units += work.upper_left.split("").length;
    }

    if (work.upper_right) {
      units += work.upper_right.split("").length;
    }

    if (work.lower_left) {
      units += work.lower_left.split("").length;
    }

    if (work.lower_right) {
      units += work.lower_right.split("").length;
    }

    let workPrice = workPriceMap.get(work.title);

    switch (workPrice.price_distribution) {
      case "SINGLE-UNIT": {
        total += units * workPrice.price;
        break;
      }
      case "ALL-UNIT": {
        total += workPrice.price;
        break;
      }
      case "FIRST-UNIT": {
        total += workPrice.price;
        units--;

        if (units > 0) {
          total += units * workPrice.misc.rest_price;
        }

        break;
      }
    }
  }

  return total;
}

function updatejobWithPrice(jobs, works) {
  let total = 0;
  let workPriceMap = new Map();

  for (let work of works) {
    workPriceMap.set(work.title, work);
  }

  for (let index in jobs) {
    jobs[index].amount = updateWork(jobs[index].works, workPriceMap);
    total += jobs[index].amount;
  }

  return total;
}

export default {
  updatejobWithPrice,
};
