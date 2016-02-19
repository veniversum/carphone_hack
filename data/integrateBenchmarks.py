from benchmarkScraper import converter as cpu
from beautifulSoup import scrapper as curry
from fuzzywuzzy import process

# global variables:
cpus = cpu.getCPU()  # list of dictionary
gpus = cpu.getGPU()  # list of dictionary
curryProd = curry.getListOfProducts()  # list of dictionary
# gpulink = 'http://www.videocardbenchmark.net/gpu_list.php'
# cpulink = 'https://www.cpubenchmark.net/cpu_list.php'

# getting all the models as choiceCPU
choiceCPU = []
choiceGPU = []
for c in cpus:
    choiceCPU.append(c['model'])
for g in gpus:
    choiceGPU.append(g['gpu'])

# itereating through all the prod and attach the benchmark score
for prod in curryProd:
    # gpu
    try:
        prod['GPU']
    except StandardError:
        gpu = 0
    else:
        gpu = prod['GPU']
    try:
        prod['Processor']
        # Processor
    except StandardError:
        processor = 0
    else:
        processor = prod['Processor'].encode(
            'ascii', 'ignore').split('\n')[0][2:]
        processor = processor.replace('Processor', '')
        processor = processor.replace('Intel', '')
        processor = processor.replace('-', ' ')
        processor = processor.replace('Core', '')
        # print processor

    # top 10 of the match
    if processor:
        selectedModel = process.extractOne(
            processor, choiceCPU)  # , limit=10, )
        # print processor
        # print selectedModel

        if selectedModel[1] > 70:
            for c in cpus:
                if c['model'] == selectedModel[0]:
                    prod['cpubenchmark'] = c['score']
                    # print "!!" + prod['cpubenchmark']
                    break

    if gpu:
        selectedModel = process.extractOne(gpu, choiceGPU)
        # print gpu

        if selectedModel[1] > 70:
            for g in gpus:
                if g['gpu'] == selectedModel[0]:
                    prod['gpubenchmark'] = g['score']
                    # print '!!' + prod['gpubenchmark']
                    break


def getProducts():
    # print curryProd
    return curryProd
