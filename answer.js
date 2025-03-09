document.getElementById('submit').addEventListener('click', function(event) {
    // Prevent form submission and page refresh
    event.preventDefault();

    // Gejala Umum
    const ingusMengalir = document.querySelector('input[name="ingusMengalir"]:checked').value;
    const hidungTersumbat = document.querySelector('input[name="hidungTersumbat"]:checked').value;
    const bersinBersin = document.querySelector('input[name="bersinBersin"]:checked').value;
  
    // Gejala Lanjutan
    const suhuTubuh = document.querySelector('input[name="suhuTubuh"]:checked').value;
    const ingusBerwarna = document.querySelector('input[name="ingusBerwarna"]:checked').value;
    const nafsuMakan = document.querySelector('input[name="nafsuMakan"]:checked').value;
  
    // Gejala Lainnya
    const sesakNapas = document.querySelector('input[name="sesakNapas"]:checked').value;
    const nyeriMenelan = document.querySelector('input[name="nyeriMenelan"]:checked').value;
  
    // Nilai CF untuk setiap gejala
    const cfValues = {
      ingusMengalir: 0.8,
      hidungTersumbat: 0.6,
      bersinBersin: 0.7,
      suhuTubuh: 0.9,
      ingusBerwarna: 0.85,
      nafsuMakan: 0.5,
      sesakNapas: 0.95,
      nyeriMenelan: 0.7
    };
  
    let gejalaUmumCF = 0;
    let gejalaLanjutanCF = 0;
    let gejalaLainnyaCF = 0;
  
    // Check and combine CF for Gejala Umum
    if (ingusMengalir === 'Ya') gejalaUmumCF = cfValues.ingusMengalir;
    if (hidungTersumbat === 'Ya') gejalaUmumCF = combineCF(gejalaUmumCF, cfValues.hidungTersumbat);
    if (bersinBersin === 'Ya') gejalaUmumCF = combineCF(gejalaUmumCF, cfValues.bersinBersin);

    // if (ingusMengalir === 'Tidak') gejalaUmumCF = 0;
    // if (hidungTersumbat === 'Tidak') gejalaUmumCF = 0;
    // if (bersinBersin === 'Tidak') gejalaUmumCF = 0;
  
    // Check and combine CF for Gejala Lanjutan
    if (suhuTubuh === 'Ya') gejalaLanjutanCF = cfValues.suhuTubuh;
    if (ingusBerwarna === 'Ya') gejalaLanjutanCF = combineCF(gejalaLanjutanCF, cfValues.ingusBerwarna);
    if (nafsuMakan === 'Ya') gejalaLanjutanCF = combineCF(gejalaLanjutanCF, cfValues.nafsuMakan);
  
    // Check and combine CF for Gejala Lainnya
    if (sesakNapas === 'Ya') gejalaLainnyaCF = cfValues.sesakNapas;
    if (nyeriMenelan === 'Ya') gejalaLainnyaCF = combineCF(gejalaLainnyaCF, cfValues.nyeriMenelan);
  
    let hasilDiagnosa = 'Tidak Diketahui';
    let cfDiagnosa = 0;
  
    // Determine Diagnosis based on CF
    if (gejalaUmumCF > 0 && gejalaLanjutanCF > 0 && gejalaLainnyaCF > 0) {
      hasilDiagnosa = 'Penyakit Lainnya';
      cfDiagnosa = combineCF(combineCF(gejalaUmumCF, gejalaLanjutanCF), gejalaLainnyaCF);
    } else if (gejalaUmumCF > 0 && gejalaLanjutanCF > 0 && gejalaLainnyaCF === 0) {
      hasilDiagnosa = 'Flu Tingkat Lanjut';
      cfDiagnosa = combineCF(gejalaUmumCF, gejalaLanjutanCF);
    } else if (gejalaUmumCF > 0 && gejalaLanjutanCF === 0 && gejalaLainnyaCF > 0) {
      hasilDiagnosa = 'Penyakit Lainnya';
      cfDiagnosa = combineCF(gejalaUmumCF, gejalaLainnyaCF);
    } else if (gejalaUmumCF > 0 && gejalaLanjutanCF === 0 && gejalaLainnyaCF === 0) {
      hasilDiagnosa = 'Flu Ringan';
      cfDiagnosa = gejalaUmumCF;
    } else if (gejalaUmumCF === 0) {
      hasilDiagnosa = 'Penyakit Lainnya';
      cfDiagnosa = combineCF(gejalaLanjutanCF, gejalaLainnyaCF);
    } 

    // if (gejalaUmumCF > 0 && gejalaLanjutanCF === 0 && gejalaLainnyaCF === 0) {
		// 	hasilDiagnosa = "Flu Ringan";
		// 	cfDiagnosa = gejalaUmumCF;
		// } else if (gejalaUmumCF > 0 && gejalaLanjutanCF > 0 &&gejalaLainnyaCF === 0) {
		// 	hasilDiagnosa = "Flu Lanjutan";
		// 	cfDiagnosa = combineCF(gejalaUmumCF, gejalaLanjutanCF);
		// } else if (gejalaUmumCF > 0 && gejalaLanjutanCF === 0 && gejalaLainnyaCF > 0) {
    //   hasilDiagnosa = "Penyakit Lainnya";
		// 	cfDiagnosa = combineCF(gejalaUmumCF, gejalaLainnyaCF);
		// } else if (gejalaUmumCF > 0 && gejalaLanjutanCF > 0 && gejalaLainnyaCF > 0
		// ) {
		// 	hasilDiagnosa = "Penyakit Lainnya";
		// 	cfDiagnosa = combineCF(combineCF(gejalaUmumCF, gejalaLanjutanCF), gejalaLainnyaCF);
		// } else if (gejalaUmumCF > 0 && gejalaLainnyaCF > 0) {
		// 	hasilDiagnosa = "Penyakit Lainnya";
		// 	cfDiagnosa = combineCF(gejalaUmumCF, gejalaLainnyaCF);
		// } else if (gejalaUmumCF > 0) {
		// 	hasilDiagnosa = "Penyakit Lainnya";
		// 	cfDiagnosa = combineCF(combineCF(gejalaLainnyaCF, gejalaLanjutanCF));
		// }
    
  
    document.getElementById('answer').innerText = `${hasilDiagnosa} (CF: ${cfDiagnosa.toFixed(2)})`;
  });
  
  function combineCF(cf1, cf2) {
    return cf1 + cf2 * (1 - cf1);
  }

  document.getElementById('resetButton').addEventListener('click', function() {
    // Mengatur ulang form dengan menghapus pilihan sebelumnya
    const inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => {
        input.checked = false;
    });
    // Menghapus hasil diagnosa sebelumnya
    document.getElementById('answer').innerText = '';
    window.scrollTo(0, 0);
});

function calculateUncertaintyText(cfDiagnosa) {
  if (cfDiagnosa >= 0.8) {
    return ' - Sangat Yakin';
  } else if (cfDiagnosa >= 0.6) {
    return ' - Cukup Yakin';
  } else if (cfDiagnosa >= 0.4) {
    return ' - Kurang Yakin';
  } else {
    return ' - Tidak Yakin';
  }
}