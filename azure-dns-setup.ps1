# Azure DNS Configuration Script for gerdsen.ai
# This script performs the following:
# 1. Login to Azure
# 2. List DNS zones to find gerdsen.ai
# 3. Add A records for the root domain pointing to GitHub Pages IPs
# 4. Add CNAME record for www subdomain pointing to GitHub Pages
# 5. Verify the DNS records were created correctly

# Step 1: Login to Azure
Write-Host "Logging in to Azure..." -ForegroundColor Cyan
Connect-AzAccount

# Step 2: Get DNS Zone
Write-Host "Retrieving DNS zones..." -ForegroundColor Cyan
$dnsZones = Get-AzDnsZone
$dnsZones | Format-Table Name, ResourceGroupName

# Find the gerdsen.ai zone - if it doesn't exist, you'll need to create it
$zoneName = "gerdsen.ai"
$zone = $dnsZones | Where-Object { $_.Name -eq $zoneName }

if ($null -eq $zone) {
    Write-Host "DNS zone $zoneName not found. Do you want to create it? (Y/N)" -ForegroundColor Yellow
    $createZone = Read-Host
    
    if ($createZone -eq "Y" -or $createZone -eq "y") {
        Write-Host "Please enter the resource group name to create the DNS zone in:" -ForegroundColor Yellow
        $resourceGroupName = Read-Host
        
        Write-Host "Creating DNS zone $zoneName in resource group $resourceGroupName..." -ForegroundColor Cyan
        $zone = New-AzDnsZone -Name $zoneName -ResourceGroupName $resourceGroupName
        Write-Host "DNS zone created successfully." -ForegroundColor Green
    } else {
        Write-Host "DNS zone creation skipped. Exiting script." -ForegroundColor Red
        exit
    }
} else {
    Write-Host "Found DNS zone: $($zone.Name) in resource group: $($zone.ResourceGroupName)" -ForegroundColor Green
    $resourceGroupName = $zone.ResourceGroupName
}

# Step 3: Add A records for root domain pointing to GitHub Pages IPs
Write-Host "Adding A records for root domain..." -ForegroundColor Cyan
$githubIPs = @(
    "185.199.108.153",
    "185.199.109.153",
    "185.199.110.153",
    "185.199.111.153"
)

# Remove existing A records first to avoid conflicts
$existingARecords = Get-AzDnsRecordSet -ResourceGroupName $resourceGroupName -ZoneName $zoneName -RecordType A -Name "@" -ErrorAction SilentlyContinue
if ($existingARecords) {
    Write-Host "Removing existing A records for @ (root domain)..." -ForegroundColor Yellow
    Remove-AzDnsRecordSet -ResourceGroupName $resourceGroupName -ZoneName $zoneName -RecordType A -Name "@" -Force
}

# Create a new recordset with all GitHub IPs
$recordSet = New-AzDnsRecordSet -Name "@" -RecordType A -ZoneName $zoneName -ResourceGroupName $resourceGroupName -Ttl 3600
foreach ($ip in $githubIPs) {
    Add-AzDnsRecordConfig -RecordSet $recordSet -Ipv4Address $ip
}
Set-AzDnsRecordSet -RecordSet $recordSet

Write-Host "A records for root domain added successfully." -ForegroundColor Green

# Step 4: Add CNAME for www subdomain
Write-Host "Adding CNAME record for www subdomain..." -ForegroundColor Cyan

# Remove existing CNAME record first to avoid conflicts
$existingCNAME = Get-AzDnsRecordSet -ResourceGroupName $resourceGroupName -ZoneName $zoneName -RecordType CNAME -Name "www" -ErrorAction SilentlyContinue
if ($existingCNAME) {
    Write-Host "Removing existing CNAME record for www..." -ForegroundColor Yellow
    Remove-AzDnsRecordSet -ResourceGroupName $resourceGroupName -ZoneName $zoneName -RecordType CNAME -Name "www" -Force
}

# Add CNAME record
$cnameRecord = New-AzDnsRecordSet -Name "www" -RecordType CNAME -ZoneName $zoneName -ResourceGroupName $resourceGroupName -Ttl 3600
Add-AzDnsRecordConfig -RecordSet $cnameRecord -Cname "gerdsenai-admin.github.io"
Set-AzDnsRecordSet -RecordSet $cnameRecord

Write-Host "CNAME record for www subdomain added successfully." -ForegroundColor Green

# Step 5: Verify DNS records
Write-Host "Verifying DNS records..." -ForegroundColor Cyan

Write-Host "A Records for root domain:" -ForegroundColor Magenta
Get-AzDnsRecordSet -ZoneName $zoneName -ResourceGroupName $resourceGroupName -RecordType A -Name "@" | Format-List Name, TTL, Records

Write-Host "CNAME Record for www subdomain:" -ForegroundColor Magenta
Get-AzDnsRecordSet -ZoneName $zoneName -ResourceGroupName $resourceGroupName -RecordType CNAME -Name "www" | Format-List Name, TTL, Records

Write-Host "DNS configuration completed successfully!" -ForegroundColor Green
Write-Host "Note: DNS changes may take some time to propagate (typically up to 24-48 hours)." -ForegroundColor Yellow
Write-Host "You can verify using 'nslookup -type=a gerdsen.ai' and 'nslookup -type=cname www.gerdsen.ai'" -ForegroundColor Yellow

# Instructions for GitHub Pages configuration
Write-Host "`n=== GitHub Pages Configuration ===" -ForegroundColor Cyan
Write-Host "Remember to configure your GitHub Pages repository with your custom domain:" -ForegroundColor White
Write-Host "1. Go to your GitHub repository settings" -ForegroundColor White
Write-Host "2. Scroll down to the 'GitHub Pages' section" -ForegroundColor White
Write-Host "3. Enter your custom domain: gerdsen.ai" -ForegroundColor White
Write-Host "4. Save the changes" -ForegroundColor White
Write-Host "5. Check 'Enforce HTTPS' if it's available (may take time to become available)" -ForegroundColor White
