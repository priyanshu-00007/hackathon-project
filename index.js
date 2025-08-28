    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('carousel-dots');
    
    // Create dots for each slide
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        showSlide(i);
      });
      dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
      slideIndex = index;
      
      // Ensure index is within bounds
      if (slideIndex >= slides.length) slideIndex = 0;
      if (slideIndex < 0) slideIndex = slides.length - 1;
      
      // Move slides
      document.getElementById('slides').style.transform = `translateX(-${slideIndex * 100 / 3}%)`;
      
      // Update active dot
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === slideIndex);
      });
    }
    
    function moveSlide(n) {
      showSlide(slideIndex + n);
    }
    
    // Auto slide change every 5 seconds
    setInterval(() => {
      moveSlide(1);
    }, 7000);

    
       const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 1,
            class: 'is-inview',
            offset: ['-15%', 0],
            reloadOnContextChange: true
        });

        // Update scroll when page changes
        document.addEventListener('DOMContentLoaded', function() {
            scroll.update();
        });

       
       

        // Carbon footprint calculator
        function calculateFootprint() {
            // Get values from form
            const electricity = parseFloat(document.getElementById('electricity').value) || 0;
            const gas = parseFloat(document.getElementById('gas').value) || 0;
            const carMileage = parseFloat(document.getElementById('car').value) || 0;
            const carType = document.getElementById('car-type').value;
            const flights = parseFloat(document.getElementById('flights').value) || 0;
            const diet = document.getElementById('diet').value;
            
            // Calculate emissions (simplified calculations)
            let footprint = 0;
            
            // Electricity: 0.7 lbs CO2 per kWh (US average)
            footprint += electricity * 0.7 * 12 / 2204.6; // Convert lbs to tons
            
            // Natural gas: 11.7 lbs CO2 per therm
            footprint += gas * 11.7 * 12 / 2204.6;
            
            // Car: varies by car type
            const carFactors = {
                'small': 0.6,
                'medium': 0.8,
                'large': 1.1,
                'hybrid': 0.4
            };
            footprint += carMileage * carFactors[carType] * 12 / 2204.6;
            
            // Flights: 0.5 tons per short-haul flight
            footprint += flights * 0.5;
            
            // Diet: annual impact
            const dietFactors = {
                'meat': 3.3,
                'vegetarian': 2.5,
                'vegan': 2.0
            };
            footprint += dietFactors[diet];
            
            // Display result
            const resultElement = document.getElementById('result');
            const footprintValue = document.getElementById('footprint-value');
            const suggestionsList = document.getElementById('suggestions-list');
            
            footprintValue.textContent = `${footprint.toFixed(2)} tons of CO₂ per year`;
            
            // Generate suggestions based on footprint
            suggestionsList.innerHTML = '';
            const suggestions = [];
            
            if (electricity > 500) {
                suggestions.push('Switch to energy-efficient appliances and LED lighting');
            }
            
            if (gas > 100) {
                suggestions.push('Improve home insulation and consider a high-efficiency furnace');
            }
            
            if (carMileage > 1000) {
                suggestions.push('Use public transportation, carpool, or bike when possible');
            }
            
            if (flights > 2) {
                suggestions.push('Consider video conferencing instead of flying for business meetings');
            }
            
            if (diet === 'meat') {
                suggestions.push('Reduce meat consumption - try meatless Mondays');
            }
            
            if (suggestions.length === 0) {
                suggestions.push('You\'re doing great! Keep up your sustainable habits');
            }
            
            suggestions.forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                suggestionsList.appendChild(li);
            });
            
            resultElement.style.display = 'block';
            
            // Scroll to results
            scroll.scrollTo('#result');
        }